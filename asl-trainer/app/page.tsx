"use client"

import { useRef } from "react"
import { motion, animate, MotionValue, useMotionValue, useMotionValueEvent, useScroll } from "motion/react"

/**
 * Scroll Mask Hook
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

  useMotionValueEvent(scrollXProgress, "change", () => {
    const value = scrollXProgress.get()
    const prev = scrollXProgress.getPrevious()
    if (value === 0) {
      animate(maskImage, `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`)
    } else if (value === 1) {
      animate(maskImage, `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`)
    } else if (prev === 0 || prev === 1) {
      animate(maskImage, `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`)
    }
  })

  return maskImage
}

/**
 * Landing Page Component
 */
export default function HomeLanding() {
  const ref = useRef<HTMLUListElement | null>(null)
  const { scrollXProgress } = useScroll({ container: ref })
  const maskImage = useScrollOverflowMask(scrollXProgress)

  const cards: [string, string][] = [
    ["A", "pink"],
    ["B", "purple"],
    ["C", "violet"],
    ["D", "blue"],
    ["E", "cyan"],
    ["F", "purple"],
    ["G", "violet"],
    ["H", "blue"],
    ["I", "cyan"],
    ["J", "purple"],
    ["K", "violet"],
    ["L", "blue"],
    ["M", "cyan"],
    ["N", "purple"],
    ["O", "violet"],
    ["P", "blue"],
    ["Q", "cyan"],
    ["R", "purple"],
    ["S", "violet"],
    ["T", "blue"],
    ["U", "cyan"],
    ["V", "purple"],
  ]

  return (
    <main className="landing">
      {/* Hero */}
      <section className="hero">
        <h1>ASLingo</h1>
        {/* <p>Learn American Sign Language with real-time hand tracking</p> */}
        {/* <span className="hint">Scroll →</span> */}
        
        <div style={{ marginTop: "20px" }}>
          <motion.a 
            href="/about.html"
            style={{ 
              color: "#0d63f8", 
              textDecoration: "none", 
              fontWeight: 600,
              fontSize: "1.1rem",
              borderBottom: "2px solid transparent"
            }}
            whileHover={{ borderBottom: "2px solid #0d63f8" }}
          >
            About Us →
          </motion.a>
        </div>
      </section>

      {/* CTA Button */}
      <div className="cta-wrapper">
        <motion.a
          href="/index.html"
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Training
          <motion.span
            className="arrow"
            style={{ marginLeft: "10px" }}
            variants={{ hover: { x: 6 }, tap: { x: 0 } }}
          >
            →
          </motion.span>
        </motion.a>
      </div>

      {/* Scroll Section */}
      <section className="scroll-section">
        <motion.ul ref={ref} style={{ maskImage }}>
          {cards.map(([letter, color]) => (
            <motion.li
              key={letter}
              className={`card ${color}`}
              whileHover={{ scale: 1.5, y: -12 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <h2>{letter}</h2>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      <StyleSheet />
    </main>
  )
}

/**
 * Scoped Styles
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
        padding: 100px 24px 20px;
        text-align: center;
      }

      .hero h1 {
        font-size: clamp(2.5rem, 6vw, 4rem);
        margin: 0;
        font-weight: 800;
      }

      .hero p {
        max-width: 600px;
        margin: 5px auto;
        opacity: 0.8;
        font-size: 1.1rem;
      }

      .cta-wrapper {
        display: flex;
        justify-content: center;
        margin-top: 40px;
      }

      .cta-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 16px 36px;
        font-size: 1.1rem;
        font-weight: 600;
        text-decoration: none;
        border-radius: 999px;
        color: white;
        background: linear-gradient(135deg, #0d63f8, #0cdcf7);
        transition: background 0.3s ease;
      }

      .hint {
        display: inline-block;
        margin-top: 40px;
        margin-bottom: 32px;
        opacity: 0.6;
        font-size: 0.9rem;
      }

      /* Scroll Section */
      .scroll-section {
        padding-top: 120px;
      }

      ul {
        display: flex;
        gap: 100px;
        list-style: none;
        height: 300px;
        overflow-x: auto;
        padding: 40px 40px;
        margin: 0 0;
      }

      li {
        flex: 0 0 280px;
        border-radius: 28px;
        padding: 28px;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        box-shadow: 0 30px 60px rgba(0,0,0,0.25);
        transition: transform 0.25s ease, box-shadow 0.25s ease;
      }

      li h2 {
        margin: auto;
        justify-content: center;
        font-size: 2.5rem;
      }

      li p {
        margin: 0;
        opacity: 0.9;
        font-size: 1.2rem;
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
