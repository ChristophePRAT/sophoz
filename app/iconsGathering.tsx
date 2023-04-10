import Image from 'next/image'
import bloomberg from "../imgs/bloomberg.svg"
import cnn from "../imgs/cnn-logo.svg"
import foxnews from "../imgs/fox-news.svg"
import wsj from "../imgs/wsj.svg"
import wsp from "../imgs/wsp.svg"
import politico from "../imgs/politico.svg"
import huffpost from "../imgs/huffpost.svg"
import time from "../imgs/time.png"
import thenewyorker from "../imgs/thenewyorker.svg"
import { useRef, useEffect } from 'react'

const icons = [
	{
		name: "Bloomberg",
		src: bloomberg,
	},
	{
		name: "CNN",
		src: cnn,
	},
	{
		name: "Fox News",
		src: foxnews,
	},
	{
		name: "WSJ",
		src: wsj,
	},
	{
		name: "Washington Post",
		src: wsp,
	},
	{
		name: "Politico",
		src: politico,
	},
	{
		name: "HuffPost",
		src: huffpost,
	},
	{
		name: "The New Yorker",
		src: thenewyorker,
	},
]
export default function IconsGathering({ percentage, ...props }) {

	return (
		<div style={{
			height: "50vw",
			width: "50vw",
			position: "relative",
			padding: 0,
			}}>
			{
				icons.map((icon, index) => {
					const angle = (index / icons.length) * Math.PI * 2
					// Percentage of top and right
					const x = (Math.cos(angle)) * percentage
					const y = (Math.sin(angle)) * percentage
						return (
							<Image key={index} src={icon.src} alt={icon.name} width={100} height={100} style={{
									position: "absolute",
									transform: 'translate(-50%, -50%)',
									top: `${50 - y/2}%`,
									left: `${50 + x/2}%`,
									opacity: `${percentage/100}`,
								}}
							/>
					)
				})
			}
		</div>
	)
}
