"use client"

import { useRef } from "react"
import {
  motion,
  animate,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "motion/react"

/* ================= Scroll Mask Hook ================= */

const opaque = "#000"
const transparent = "#0000"

function useScrollOverflowMask(scrollXProgress: MotionValue<number>) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} 80%, ${transparent})`
  )

  useMotionValueEvent(scrollXProgress, "change", () => {
    const v = scrollXProgress.get()

    if (v <= 0.01) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} 80%, ${transparent})`
      )
    } else if (v >= 0.99) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} 20%, ${opaque})`
      )
    } else {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} 20%, ${opaque} 80%, ${transparent})`
      )
    }
  })

  return maskImage
}

/* ================= Landing Page ================= */

export default function HomeLanding() {
  const ref = useRef<HTMLUListElement | null>(null)
  const { scrollXProgress } = useScroll({ container: ref })
  const maskImage = useScrollOverflowMask(scrollXProgress)

  const letters = Array.from({ length: 26 }, (_, i) => {
  const upper = String.fromCharCode(65 + i)
  const lower = upper.toLowerCase()

  return {
    letter: upper,
    img: `/ASL/${lower}.png`,
  }
})

  return (
    <main className="landing">
      {/* Hero */}
      <section className="hero">
        <h1>ASLingo</h1>
        <p>Learn American Sign Language with real-time hand tracking</p>
      </section>

      {/* CTA */}
      <div className="cta-wrapper">
        <motion.a
          href="/index.html"
          className="cta-button"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Training →
        </motion.a>
      </div>

      {/* Scroll Cards */}
      <section className="scroll-section">
        <motion.ul ref={ref} style={{ maskImage }}>
          {letters.map(({ letter, img }) => (
            <motion.li
              key={letter}
              className="card"
              style={{ backgroundImage: `url(${img})` }}
              whileHover={{ scale: 1.25, y: -14 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <div className="overlay">
                <h2>{letter}</h2>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      <StyleSheet />
    </main>
  )
}

/* ================= Styles ================= */

function StyleSheet() {
  return (
    <style>{`
      :root {
        --bg: #0f1115;
        --text: #e5e7eb;
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
        padding: 120px 24px 40px;
        text-align: center;
      }

      .hero h1 {
        font-size: clamp(3rem, 7vw, 4.5rem);
        font-weight: 800;
        margin: 0;
      }

      .hero p {
        margin-top: 10px;
        opacity: 0.8;
        font-size: 1.15rem;
      }

      /* CTA */
      .cta-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: 100px;
      }

      .cta-button {
        padding: 16px 40px;
        border-radius: 999px;
        font-size: 1.1rem;
        font-weight: 600;
        text-decoration: none;
        color: white;
        background: linear-gradient(135deg, #0d63f8, #0cdcf7);
        box-shadow: 0 20px 40px rgba(13,99,248,0.35);
      }

      /* Scroll */
      .scroll-section {
        padding-bottom: 100px;
      }

      ul {
        display: flex;
        gap: 36px;
        padding: 40px;
        margin: 0;
        list-style: none;
        overflow-x: auto;
      }

      .card {
        flex: 0 0 260px;
        height: 360px;
        border-radius: 24px;
        background-size: cover;
        background-position: center;
        position: relative;
        box-shadow: 0 30px 60px rgba(0,0,0,0.35);
        overflow: hidden;
      }

      .card::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(0,0,0,0.65),
          rgba(0,0,0,0.15)
        );
      }

      .overlay {
        position: absolute;
        bottom: 20px;
        left: 20px;
        z-index: 2;
      }

      .overlay h2 {
        margin: 0;
        font-size: 3rem;
        font-weight: 700;
        color: white;
      }

      /* Scrollbar */
      ::-webkit-scrollbar {
        height: 6px;
      }

      ::-webkit-scrollbar-thumb {
        background: #555;
        border-radius: 999px;
      }
    `}</style>
  )
}
