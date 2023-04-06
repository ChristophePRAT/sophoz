"use client";
import Image from 'next/image'
import styles from './page.module.scss'
import { EB_Garamond } from "@next/font/google"
import { ChevronDown } from "react-feather"
import dynamic from 'next/dynamic'
import { useRef, useEffect, useState, useMemo } from 'react'
import articleContent from '../src/article'

const garamond = EB_Garamond({ subsets: ["latin"], weights: ["variable"] })

function useOnScreen(ref: RefObject<HTMLElement>) {

  const [isIntersecting, setIntersecting] = useState(false)

  const observer = useMemo(() => new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  ), [ref])


  useEffect(() => {
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return isIntersecting
}


export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.topSection}>
        <h2 className={styles.subtitle}>Introducing</h2>
        <h1 className={styles.title}><span className={garamond.className}>Sophoz</span></h1>
        <h2 className={styles.heading}>Ordinary news for extraordinary people</h2>
      </section>
      <ChevronDown className={styles.chevron} size={48} />
      <section className={styles.section}>
        <p className={styles.backgroudText}>{articleContent}</p>
        <div className={styles.article}>
          <h2 className={styles.heading}>News need change</h2>
          <p className={styles.pitch}>It's time news become more readable<br />So long raw text, welcome understanding through visuals</p>
        </div>
      </section>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Our vision</h3>
        <p>
          We have come to understand that news isn't attractive anymore. To us, this can be explained by two simple factors:
        </p>
        <ul>
          <li>News are hard to read</li>
          <li>Information is too sparse</li>
        </ul>
        <p>
          Let us explain...
        </p>
      </section>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>You are missing out on the important stuff</h3>
      </section>
    </main>
  )
}
