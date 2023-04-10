"use client";
import Image from 'next/image'
import styles from './page.module.scss'
import { EB_Garamond, Inter } from "@next/font/google"
import { ChevronDown } from "react-feather"
import dynamic from 'next/dynamic'
import { useRef, useEffect, useState, useMemo } from 'react'
import articleContent from '../src/article'
// Import IconsGathering dynamically
const IconsGathering = dynamic(() => import('./iconsGathering'), {
  ssr: false,
})

const garamond = EB_Garamond({
  variable: "--garamond-font",
  subsets: ["latin"],
})
const inter = Inter({
  variable: '--inter-font',
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
  const [circleRadius, setCircleRadius] = useState(100)


  const handleScroll = () => {
    const element: any = secondSectionRef.current
    if (element) {
      const secondPercentage = (1 - (element.offsetTop / element.offsetHeight) * 0.5) * 100

      if (secondPercentage === 100) {
        if (Math.random() > 0.75) {
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
        <h2 className={styles.subtitle}>Introducing</h2>
        <div className={styles.noise}>
        </div>

        <h1 className={styles.title}>Sophoz</h1>
        <h2 className={styles.heading}>Ordinary news for extraordinary people</h2>
      </section>
      <ChevronDown className={styles.chevron} size={48} />
      <div className={styles.scrollSection}>
        <section className={styles.hardToReadSection} ref={firstSectionRef}>
          <div className={styles.left}>
            <h2 className={styles.heading}>Hard to read</h2>
            <p className={styles.paragraph}>
              News can be overwhelming. Dozens of paragraphs to say nothing. It should not be this hard to get informed.
            </p>
          </div>
          <div className={styles.right}>
            <p className={styles.backgroudText}>{text}</p>
          </div>
        </section>
      </div>
      <div className={styles.scrollSection}>
        <section className={styles.tooSparseSection} ref={secondSectionRef}>
          <div className={styles.left}>
            <IconsGathering percentage={circleRadius} />
          </div>
          <div className={styles.right}>
            <h2 className={styles.heading}>Too sparse</h2>
            <p className={styles.paragraph}>
              Information is everywhere. <br /> And so is misinformation.<br /> You deserve better news. Using AI, we will clear out the noise.
            </p>
          </div>
        </section>
      </div>
      {/*
          <section className={styles.section}>

          <div className={styles.article}>
          <h2 className={styles.heading}>News need change</h2>
          <div className={styles.pitch}>
          <p>It's time news become attractive</p>
          <p>So long reading meaningless text</p>
          <p>Welcome understanding through visuals</p>
          <p className={styles.description}>
          Sophoz uses AI technologies to create comprehesive and detailed visuals decrypting the news.
          </p>
          </div>
          </div>
          </section>
                        */}

      <footer className={styles.footer}>
        <p>© 2023 Sophoz</p>
      </footer>

    </main>
  )
}
