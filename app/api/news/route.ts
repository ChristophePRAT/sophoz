import { NextResponse } from 'next/server'
import newspaper from './newspaper.json'
import cheerio from "cheerio";
import he from "he";

const API_KEY = process.env.API_KEY;
const COHERE_KEY = process.env.COHERE_KEY;

const newspaperData = newspaper;

async function getSearchResults(query: string) {
	if (!API_KEY) {
		throw new Error("API_KEY is not defined");
	}
	const baseURL = "https://api.search.brave.com/res/v1/web/search"
	const urlComponent = encodeURIComponent(query);
	const response = await fetch(`${baseURL}?q=${urlComponent}&result_filter=news`, {
		headers: {
			"Accept-Encoding": "gzip",
			"X-Subscription-Token": API_KEY
		}
	})
	console.log(`Got ${response.status} from ${response.url}`);
	return response.json();
}

// Filter for unwanted text
function checkText(text: string) {
	const unwantedPhrases = [
		"En savoir plus",
		"Abonnez-vous",
		"Abonnement",
		"identifier",
		"créer un compte",
		"sans engagement",
		"Mentions légales",
		"Copyright",
		"CGU",
		"CGV",
		"Politique de confidentialité",
		"All Rights Reserved",
		"©",
	]
	// Do a regex check for either of the phrases
	const regex = new RegExp(unwantedPhrases.join("|"), "i");
	return !regex.test(text);
}

async function retrieveText(url: string) {
	let response = await fetch(url)
	const html = await response.text();
	const $ = cheerio.load(html);
	let textContent: any[] = []
	$("p").each((index, element) => {
		const decodedText = he.decode($(element).text());

		const cleanedText = decodedText
			.replace(/\s+/g, ' ') // Replace multiple consecutive whitespace characters with a single space
			.trim(); // Remove leading and trailing whitespace
		if (cleanedText.length > 0 && checkText(cleanedText)) {
			textContent.push(cleanedText);
		}
	})
	return textContent.join(" ");
}

function groupByOrientation(data: any[]) {
	console.log(data);
	const groups: any = {
		"Far left": [], // 0-2
		"Left": [], // 2-4.5
		"Center": [], //4.5-5.5
		"Right": [], // 5.5-8
		"Far right": [], // 8-10
	}
	data.forEach((item: any) => {
		const orientation = Number(item.orientation)
		if (orientation >= 0 && orientation < 2) {
			groups["Far left"].push(item);
		} else if (orientation >= 2 && orientation < 4.5) {
			groups["Left"].push(item);
		} else if (orientation >= 4.5 && orientation < 5.5) {
			groups["Center"].push(item);
		} else if (orientation >= 5.5 && orientation < 8) {
			groups["Right"].push(item);
		} else if (orientation >= 8 && orientation <= 10) {
			groups["Far right"].push(item);
		}
	})
	return groups;
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const query = searchParams.get("query")

	if (!query) {
		return new Response("No query", { status: 400 })
	}
	try {
		const data = await getSearchResults(query);
		const results = data.news.results;
		const promises = results.map((result: any) => {
			console.log(`fetching ${result.url}`);
			return retrieveText(result.url).then((text: string) => {
				// Find newspaper name in newspaperData
				const newspaperThatWeWantData = newspaperData.find((newspaper: any) => {
					const regex = new RegExp(newspaper["Newspaper name"], "i");
					return regex.test(result.url);
				})
				if (!newspaperThatWeWantData || !newspaperThatWeWantData["Ideology perception"]) {
					return
				}
				return { url: result.url, text: text, orientation: newspaperThatWeWantData["Ideology perception"] };
			}).catch((err: any) => { console.error(err) })
		})
		const ret = await Promise.all(promises);
		const groupedData = groupByOrientation(ret.filter((value) => value));

		return NextResponse.json(groupedData);
	} catch(error: any) {
		return new Response(error.message, { status: 500 })
	}
}
