"use client"

import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "motion/react"
import { useRef } from "react"



/**
 * Home / Landing Page
 */
export default function HomeLanding() {
  const ref = useRef<HTMLUListElement | null>(null)
  const { scrollXProgress } = useScroll({ container: ref })
  const maskImage = useScrollOverflowMask(scrollXProgress)

  return (
    <main className="landing">
      {/* Hero */}
      <section className="hero">
        <h1>ASLingo</h1>
        <p>Learn American Sign Language with real-time hand tracking</p>
        <span className="hint">Scroll →</span>
      </section>
      
      <motion.a
        href="/index.html"
        className="cta-button"
        whileHover="hover"
        whileTap="tap"
      >
        Start Training
        <motion.span
          className="arrow"
          variants={{
            hover: { x: 6 },
            tap: { x: 0 }
          }}
        >
          →
        </motion.span>
      </motion.a>


      {/* Scroll Section */}
      <section className="scroll-section">
        <motion.ul ref={ref} style={{ maskImage }}>
          <li className="card pink">
            <h2>A</h2>
            <p>Train signs with live webcam feedback</p>
          </li>

          <li className="card purple">
            <h2>B</h2>
            <p>MediaPipe-powered hand landmarks</p>
          </li>

          <li className="card violet">
            <h2>C</h2>
            <p>Build muscle memory interactively</p>
          </li>

          <li className="card blue">
            <h2>D</h2>
            <p>Designed for everyone</p>
          </li>

          <li className="card cyan">
            <h2>E</h2>
            <p>Dark & light mode support</p>
          </li>

           <li className="card purple">
            <h2>F</h2>
            <p>MediaPipe-powered hand landmarks</p>
          </li>

          <li className="card violet">
            <h2>G</h2>
            <p>Build muscle memory interactively</p>
          </li>

          <li className="card blue">
            <h2>H</h2>
            <p>Designed for everyone</p>
          </li>

          <li className="card cyan">
            <h2>I</h2>
            <p>Dark & light mode support</p>
          </li>

          <li className="card purple">
            <h2>J</h2>
            <p>MediaPipe-powered hand landmarks</p>
          </li>

          <li className="card violet">
            <h2>K</h2>
            <p>Build muscle memory interactively</p>
          </li>

          <li className="card blue">
            <h2>L</h2>
            <p>Designed for everyone</p>
          </li>

          <li className="card cyan">
            <h2>M</h2>
            <p>Dark & light mode support</p>
          </li>

          <li className="card purple">
            <h2>N</h2>
            <p>MediaPipe-powered hand landmarks</p>
          </li>

          <li className="card violet">
            <h2>O</h2>
            <p>Build muscle memory interactively</p>
          </li>

          <li className="card blue">
            <h2>P</h2>
            <p>Designed for everyone</p>
          </li>

          <li className="card cyan">
            <h2>Q</h2>
            <p>Dark & light mode support</p>
          </li>

          <li className="card purple">
            <h2>R</h2>
            <p>MediaPipe-powered hand landmarks</p>
          </li>

          <li className="card violet">
            <h2>S</h2>
            <p>Build muscle memory interactively</p>
          </li>

          <li className="card blue">
            <h2>T</h2>
            <p>Designed for everyone</p>
          </li>

          <li className="card cyan">
            <h2>U</h2>
            <p>Dark & light mode support</p>
          </li>

          <li className="card purple">
            <h2>V</h2>
            <p>MediaPipe-powered hand landmarks</p>
          </li>

        </motion.ul>
      </section>

      <StyleSheet />
    </main>
  )
}

/**
 * Scroll Mask Logic (your pattern, refined)
 */
const left = `0%`
const right = `100%`
const leftInset = `20%`
const rightInset = `80%`
const transparent = `#0000`
const opaque = `#000`

function useScrollOverflowMask(scrollXProgress: MotionValue<number>) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  )

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
      )
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
      )
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      )
    }
  })

  return maskImage
}

/**
 * Styles (scoped + sleek)
 */
function StyleSheet() {
  return (
    <style>{`
      :root {
        --bg: #ffffff;
        --text: #111;
        --card-bg: #f4f4f5;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --bg: #0f1115;
          --text: #e5e7eb;
          --card-bg: #1a1d23;
        }
      }

      body {
        margin: 0;
        background: var(--bg);
        color: var(--text);
        font-family: "Google Sans", system-ui, sans-serif;
      }

      .landing {
        min-height: 100vh;
      }

      /* Hero */
      .hero {
        padding: 120px 24px 80px;
        text-align: center;
      }

      .hero h1 {
        font-size: clamp(2.5rem, 6vw, 4rem);
        margin: 0;
        font-weight: 700;
      }

      .hero p {
        max-width: 600px;
        margin: 16px auto 0;
        opacity: 0.8;
        font-size: 1.1rem;
      }
      .cta-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-top: 40px;
        padding: 16px 36px;

        font-size: 1.1rem;
        font-weight: 600;
        text-decoration: none;
        border-radius: 999px;

        color: white;
        background: linear-gradient(
          135deg,
          #0d63f8,
          #0cdcf7
        );

        transition: background 0.3s ease;
      }

      .hint {
        display: inline-block;
        margin-top: 32px;
        opacity: 0.6;
        font-size: 0.9rem;
      }

      /* Scroll Section */
      .scroll-section {
        padding-bottom: 80px;
      }

      ul {
        display: flex;
        gap: 20px;
        list-style: none;
        height: 260px;
        overflow-x: auto;
        padding: 40px 20px;
        margin: 0 auto;
        max-width: 100%;
      }

      li {
        flex: 0 0 240px;
        border-radius: 20px;
        padding: 24px;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        box-shadow: 0 20px 40px rgba(0,0,0,0.25);
      }

      li h2 {
        margin: 0 0 8px;
        font-size: 1.4rem;
      }

      li p {
        margin: 0;
        opacity: 0.9;
        font-size: 0.95rem;
      }

      /* Card colors */
      .pink { background: #ff0088; }
      .purple { background: #dd00ee; }
      .violet { background: #9911ff; }
      .blue { background: #0d63f8; }
      .cyan { background: #0cdcf7; }

      /* Scrollbar */
      ::-webkit-scrollbar {
        height: 6px;
      }

      ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 999px;
      }
    `}</style>
  )
}
