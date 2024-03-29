"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import type { Database } from '@/types/supabase'

export default function Page() {
	const supabase = createClientComponentClient<Database>()
	const router = useRouter()

	const searchParams = useSearchParams()
	const search = searchParams.get('query')
	const [query, setQuery] = useState(search || "")

	const [articles, setArticles] = useState<any>([])
	const [loadingText, setLoadingText] = useState("")

	useEffect(() => {
		(async () => {
			const { data: { session } } = await supabase.auth.getSession()
			if (!session || !session.user) {
				router.push('/login')
			}
			console.log(session)
		})()
	}, [supabase, router])

	useEffect(() => {
		// Fetch data from supabase
		(async () => {
			if (!search) {
				const { data, error } = await supabase
				.from('articles')
				.select(`
								id,
								title,
								context,
								conclusion,
								tags,
								positions (
									id,
									content,
									bias
								)
								`)
				if (error) {
					console.log(error)
					return
				}
				if (data && data.length > 0) {
					setArticles(data)
				}
				return
			}
			const { data, error } = await supabase
			.from('articles')
			.select(`
							id,
							title,
							context,
							conclusion,
							tags,
							positions (
								id,
								content,
								bias
							)
				`)
				.textSearch('title', search, { 
					config: 'english',
					type: 'websearch' 
				})
				if (error) {
					console.log(error)
					return
				}
				if (!data || data.length === 0) {
					setLoadingText("Loading news...")
					//const { data } = await fetch(`${location.origin}/api/news?query=${search}`)
					const response = await fetch(`${location.origin}/api/news?query=${search}`)
					const newspaperData = await response.json()
					console.log({ newspaperData })

					// Add to supabase
					const { data: supabaseData, error: supabaseError } = await supabase.from('articles').insert([
						{
							title: search,
							context: "",
							conclusion: "",
							tags: [],
						}
					])
					.select()
					if (supabaseError) {
						console.error(supabaseError)
						setLoadingText("")
						return
					}
					if (!supabaseData || !supabaseData[0] || !supabaseData[0].id) {
						console.error("No data returned from supabase")
						setLoadingText("")
						return
					}

					setLoadingText("Generating summaries...")
					const rawSummaries = await fetch(`${location.origin}/api/ai`, { 
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({newspaperData})
					})

					if (!rawSummaries) {
						console.error("No data returned from newspaper")
						setLoadingText("")
						return
					}
					const summaries = await rawSummaries.json()
					console.log(summaries)
					const formattedPositions = summaries.map((article: any, index: number) => {
						return {
							parent_article: supabaseData[0].id,
							content: article.summary,
							bias: article.bias,
						}
					})
					const { data: supabasePositionData, error: supabasePositionError } = await supabase.from('positions').insert(
						formattedPositions
					).select()
					if (supabasePositionError) {
						console.error(supabasePositionError)
						return
					}
					if (!supabasePositionData) {
						console.error("No data returned from supabase")
						return
					}
					setLoadingText("")
					router.refresh()
				} else {
					setArticles(data)
				}
		})()
	}, [search, supabase, router])

	const handleSearch = async (formData: any) => {
		formData.preventDefault()
		const query = String(formData.target.query.value)
		router.push(`/balanced_news?query=${query}`)
	}

	const handleSignOut = async () => {
		await supabase.auth.signOut()
		router.push('/login')
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<button className="text-red-500 hover:text-red-600 absolute top-0 right-0 m-4" onClick={handleSignOut}>Sign out</button>
			<h1 className="text-6xl font-bold">Balanced news</h1>
			<h2 className="text-2xl m-2">A news aggregator that shows you both sides of the story</h2>
			<h3 className="text-lg mb-4">Available in English only</h3>
			<form className="flex flex-row items-center justify-center" onSubmit={handleSearch}>
				<input className="rounded-xl p-2 m-2 text-md outline-none bg-gray-200 text-black w-72" autoComplete="off" type="text" name="query" placeholder="Browse news" value={query} onChange={(e: any) => setQuery(e.target.value) } />
				<input className="rounded-xl p-2 m-2 text-md outline-none bg-red-500 w-fit px-8 text-white font-medium cursor-pointer hover:opacity-80 transition transition-all" type="submit" value="Search" />
			</form>
			<div className="flex flex-col items-center justify-center">
				{articles && articles.map((article: any) => (
					<div key={article.id} className="flex flex-col items-center justify-center m-8 p-4 bg-white rounded-xl shadow-xl">
						<h3 className="text-5xl font-bold">{article.title}</h3>
						{article.positions && article.positions.map((position: any) => (
							<div key={position.id} className="flex flex-col items-start justify-center m-8 p-8 bg-gray-100 rounded-xl shadow-xl">
								<h4 className="text-4xl font-bold">{position.bias}</h4>
								<p className="text-lg leading-loose">{position.content}</p>
							</div>
						))}
					</div>
				))}
				{ loadingText && <p className="animate-pulse text-gray-700">{loadingText}</p> }
			</div>
		</div>
	);
}
