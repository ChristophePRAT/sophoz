const COHERE_KEY = process.env.COHERE_KEY;

export async function generateSummary(text: string) {
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
	if (!json || !json.generations || !json.generations[0]) {
        console.log(json)
        console.log(COHERE_KEY)
        throw new Error("Invalid response from Cohere");
	}
	return json.generations[0].text;
}