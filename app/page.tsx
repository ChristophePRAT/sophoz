"use client"
import Image from 'next/image'
import styles from './page.module.scss'
import { Playfair_Display, Inter } from "@next/font/google"
import { ChevronDown, Zap, Instagram } from "react-feather"
import dynamic from 'next/dynamic'
import { useRef, useEffect, useState, useMemo } from 'react'
import articleContent from '../src/article'
import Demo from "../public/demo.png"

const Logo = dynamic(() => import('./logo'), {
  ssr: false,
})

// Import IconsGathering dynamically
const IconsGathering = dynamic(() => import('./iconsGathering'), {
  ssr: false,
})

const garamond = Playfair_Display({
  variable: "--serif-font",
  subsets: ["latin"],
})
const inter = Inter({
  variable: '--sans-font',
  subsets: ["latin"],
})

// Create an string extension to shuffle the words
const shuffle = (str: string) => {
  var a = str.split(" ")
  a.sort(() => Math.random() - 0.5)
  return a.join(" ")
}
const mainStyles = [styles.main, garamond.variable, inter.variable].join(' ')

export default function Home() {
  const firstSectionRef = useRef(null)
  const secondSectionRef = useRef(null)
  const [text, setText] = useState(articleContent)
  const [circleRadius, setCircleRadius] = useState(0)

  const handleScroll = () => {
    const element: any = secondSectionRef.current
    if (element) {
      const secondPercentage = element.offsetTop / (2 * element.offsetHeight)

      if (secondPercentage === 0) {
        if (Math.random() > 0.5) {
          setText((text) => shuffle(text))
        }

      } else {
        setCircleRadius(secondPercentage)
      }
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main className={mainStyles}>
      <section className={styles.topSection}>
        <div className={styles.noise}></div>
        <div className={styles.group}>
          <h2 className={styles.subtitle}>Introducing</h2>
          <h1 className={styles.title}>Sophoz</h1>
          <h2 className={styles.heading}>Understand information, not an opinion</h2>
        </div>
        <div className={styles.group}>
          {/* This will be the most beautiful button ever designed*/}
          <a className={styles.waitlist} href="https://tally.so/r/mDBjbZ">
            Join waitlist
            <Zap fill="black" />
          </a>
          <ChevronDown className={styles.chevron} size={48} />
        </div>
      </section>
      <div className={styles.scrollSection}>
        <section className={styles.hardToReadSection} ref={firstSectionRef}>
          <div className={styles.left}>
            <h2 className={styles.heading}>Hard to read</h2>
            <p className={styles.paragraph}>
              News can be overwhelming. Dozens of paragraphs to say nothing. It should not be this hard to get informed. Sophoz provides you with curated summaries of everyday news and so much more, all of this using the latest technologies.
            </p>
          </div>
          <div className={styles.right}>
            <p className={styles.backgroudText}>{text}</p>
          </div>
        </section>
      </div>
      <div className={styles.scrollSection}>
        <section className={styles.tooSparseSection} ref={secondSectionRef}>
          <div className={styles.right}>
            <h2 className={styles.heading}>Too sparse</h2>
            <p className={styles.paragraph}>
              Information is everywhere. And so is misinformation.<br /> You deserve better news. Using AI, we will clear out the noise. <br />The Sophoz app, soon to be available on iOS, will give you access to multiple opinions on each subject.
            </p>
          </div>
          <div className={styles.left}>
            <IconsGathering percentage={circleRadius} />
          </div>

        </section>
      </div>
      <section className={styles.centered}>
        <h2 className={styles.heading}>
          Understand the world
        </h2>
        <p className={styles.paragraph}>With a detailed and structured summary of a topic, get a better comprehension of the arguments of the different sides. Whether you are an expert or a begginner, the summary will provide you the useful information to know what is happening on your phone.</p>
          <Image className={styles.demo} src={Demo} alt="iPhone 14 Pro with Sophoz app" />
      </section>
      <footer className={styles.footer}>
        <div className={styles.social}>
          <p>Follow us on</p>
          <a href="https://www.instagram.com/sophozfr/"><Instagram size={48} /></a>
        </div>
        <p>Created with ❤️ by 3 passionate students <br/ >Talel Benselma, Oscar Peret, Christophe Prat</p>
        <p>© 2023 Sophoz</p>
      </footer>
    </main>
  )
}

