"use client";
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import styles from "./SubmitButton.module.css"
import { useEffect, useState } from 'react'

export default function SubmitButton() {
	const status = useFormStatus()
	const pending = status.pending
	const [hasSubmitted, setHasSubmitted] = useState(false)

	useEffect(() => {
		if (status.method) {
			setHasSubmitted(true)
			setTimeout(() => {
				setHasSubmitted(false)
			}, 30000)
		}
	}, [status])
	return (
		<>
			<input 
				type="submit"
				className={pending ? styles.secondary : styles.primary}
				disabled={pending}
				value={pending ? "Sending..." : "Send magic link"}
			/>
			{hasSubmitted && <p className="text-center font-medium">Check your inbox for a magic link</p>}
		</>
	)
}
