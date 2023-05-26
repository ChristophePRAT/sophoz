import styles from "./FAQSection.module.scss";
import { useState } from "react";
// Import chevron icon from react feather
import { ChevronDown } from "react-feather";

// Initiate a ts property for a question and its answer
type Question = {
	question: string;
	answer: string;
	isOpen?: boolean;
};

const qna: Question[] = [
	{
		question: "How will the AI be integrated in the app?",
		answer: "The app will fetch articles from our own database. Everything in our database is handled", 
	},
	{
		question: "What is the difference between Sophoz and other news apps?",
		answer: "Most of the news app provide only one point of view, or don't give any details about the political bias of each article. Sophoz makes it clear for everyone to see the political bias of each article, and also provides articles from both sides of the political spectrum.",
	},
	{
		question: "When will the app be released?",
		answer: "We are currently building the app, and we are planning to release it during Fall 2023. In the meantime, you can join the waitlist to get early access to the app.",
	},
]

export default function FAQSection() {
	const [questions, setQuestions] = useState(qna);
	return (
		<>
			{
				questions.map((question, index) => (
					<>
						<div key={index} className={styles.question}>
							<div className={styles.questionHeading} onClick={() => {
								questions[index].isOpen = !questions[index].isOpen;
								setQuestions([...questions]);
							}}>
								<h3 className={styles.questionTitle}>{question.question}</h3>
								<ChevronDown className={question.isOpen ? styles.rotatedChevron : undefined} />
							</div>
							{ question.isOpen && 
							<p className={styles.questionAnswer}>{question.answer}</p>
							}
						</div>
						{ index !== questions.length - 1 && <hr /> }
					</>
				))
			}
		</>
	);
}
