import { NextResponse } from 'next/server'

const COHERE_KEY = process.env.COHERE_KEY;

async function generateSummary(text: string) {
	const body = JSON.stringify({ 
		prompt: text,
		model: "command-nightly",
		max_tokens: 500,
		stop_sequence: [],
		temperature: 0.9,
	});

	const response = await fetch("https://api.cohere.ai/v1/generate", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${COHERE_KEY}`,
		},
		body: body,
	});
	const json = await response.json();
	console.log(json);
	return json.generations[0].text;
}

export async function POST(request: Request) {
	const { newspaperData } = await request.json()
	if (!newspaperData) {
		return new Response("No newspaper data provided.", { status: 400 })
	}
	try {
		const possibleBiases = ["Far left", "Left", "Center", "Right", "Far right"];

		const opinions = possibleBiases.map((bias: string) => {
			if (!newspaperData[bias]) {
				return "";
			}
			return newspaperData[bias].map((article: any) => { return article.text }).join("\n\n");
		}).map((text: string) => { 
			return text
			.replace(/\s+/g, ' ') // Replace multiple consecutive whitespace characters with a single space
			.trim(); // Remove leading and trailing whitespace
		})

		const initialPrompt = `\n\n Rewrite this article in a way that is more favorable to the political ideology of the newspaper that published it. The summary should be approximately 200 words long.`;

		console.log("Generating summaries...");
		const promises = opinions.filter((opinion: string) => {
			// Filter out articles that are too short
			return opinion.length > 30;
		}).map(async (opinion: string, index: number) => {
			console.log("Generating summary for article...");
			let trimmedOpinion = opinion;

			const maxCharacters = (4096 - 100) * Math.exp(1)

			if (opinion.length > maxCharacters) {
				trimmedOpinion = opinion.slice(0, maxCharacters);
			}
			const prompt = `${trimmedOpinion}  ${initialPrompt}`
			const summary = await generateSummary(prompt);
			const bias = possibleBiases[index];
			return {
				bias,
				trimmedOpinion,
				summary: summary,
			};
		});
		const summaries = await Promise.all(promises);

		return NextResponse.json(summaries)
	} catch (error: any) {
		return new Response(error, { status: 501 })
	}
}
