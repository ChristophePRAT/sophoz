"use client";
import Google from "/public/google.svg"
import Image from "next/image"
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default function GoogleButton() {
	const supabase = createBrowserSupabaseClient()
  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.VERCEL_ENV == "production" ? "https://sophoz.app" : "http://localhost:3000"}/api/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent select_account',
        },
      },
    })

    if (error) {
      console.log(error)
      return
    }
		console.log(data)
  }
	return (
		<button
			className="p-2 rounded-xl m-2 text-md outline-none bg-gray-200 text-black w-96 flex justify-center items-center hover:bg-gray-300  transition transition-all"
			onClick={handleGoogleSignIn}
		>
			<Image src={Google} alt="Google" width={24} height={24} className="mr-2" />
			Login with Google
		</button>
	)
}
