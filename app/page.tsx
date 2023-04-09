"use client";
import Image from 'next/image'
import styles from './page.module.scss'
import { EB_Garamond, Inter } from "@next/font/google"
import { ChevronDown } from "react-feather"
import dynamic from 'next/dynamic'
import { useRef, useEffect, useState, useMemo } from 'react'
import articleContent from '../src/article'

const garamond = EB_Garamond({
  variable: "--garamond-font",
  subsets: ["latin"],
})
const inter = Inter({
  variable: '--inter-font',
  weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  subsets: ["latin"],
})

// Create an string extension to shuffle the words
String.prototype.shuffle = function () {
  var a = this.split(" ")
  a.sort(() => Math.random() - 0.5)
  return a.join(" ")
}
const mainStyles = [styles.main, garamond.variable, inter.variable].join(' ')

export default function Home() {
  const firstSectionRef = useRef(null)
  const [text, setText] = useState(articleContent)


  const handleScroll = () => {
      setText((text) => text.shuffle())
      const percentageOfScroll = (1 - (firstSectionRef.current.offsetTop / firstSectionRef.current.offsetHeight) * 0.5) * Math.sqrt(2) * 50
      console.log(percentageOfScroll)
      document.documentElement.style.setProperty('--circle-offset', `${percentageOfScroll}%`)
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
        <h1 className={styles.title}>Sophoz</h1>
        <h2 className={styles.heading}>Ordinary news for extraordinary people</h2>
      </section>
      <ChevronDown className={styles.chevron} size={48} />
      <div className={styles.scrollSection}>
        <section className={styles.hardToReadSection} ref={firstSectionRef}>
          <div className={styles.left}>
            <h2 className={styles.heading}>Hard to read</h2>
            <p className={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquet nisl, eget a semper nisl nisl eu nisl. Nul
            </p>
          </div>
          <div className={styles.right}>
            <p className={styles.backgroudText}>{text}</p>
          </div>
        </section>
      </div>
      <div className={styles.scrollSection}>
        <section className={styles.tooSparseSection}>
          <div className={styles.left}>
            <p>asofdpijasdpoifj</p>
          </div>
          <div className={styles.right}>
            <h2 className={styles.heading}>Too sparse</h2>
            <p className={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquet nisl, eget a semper nisl nisl eu nisl. Nul
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
