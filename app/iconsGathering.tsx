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
import dynamic from 'next/dynamic'
const Logo = dynamic(() => import('./logo'), { ssr: false })

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
export default function IconsGathering({ percentage }: { percentage: number }) {
	return (
		<div style={{
			height: "50vw",
			width: "50vw",
			position: "relative",
			padding: 0,
			}}>
			{
				icons.map((icon, index) => {
					if (percentage > 0.5) return null
					const angle = (index / icons.length) * Math.PI * 2
					const percent = (1 - percentage * 2) * 100
					// Percentage of top and right
					const x = (Math.cos(angle)) * percent
					const y = (Math.sin(angle)) * percent 
					return (
							<Image key={index} src={icon.src} alt={icon.name} width={100} height={100} style={{
									position: "absolute",
									transform: 'translate(-50%, -50%)',
									top: `${50 - y/2}%`,
									left: `${50 + x/2}%`,
									opacity: `${percent}`,
								}}
							/>
					)
				})
			}
			{ percentage > 0.5 && 
				<div style={{
				position: "absolute",
				transform: 'translate(-50%, -50%)',
				top: "50%",
				left: "50%",
				width: "50%",
				height: "50%",
				padding: 0,
					}}
				>
					<Logo />
				</div>
			}
		</div>
	)
}
