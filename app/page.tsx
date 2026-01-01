"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function CarrotScrollPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const carrotsRef = useRef<HTMLDivElement[]>([])
  const characterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      // Animate background carrots on scroll
      carrotsRef.current.forEach((carrot, index) => {
        if (!carrot) return

        const speed = 0.5 + (index % 3) * 0.3
        const direction = index % 2 === 0 ? 1 : -1

        gsap.to(carrot, {
          y: direction * 200,
          x: direction * 100,
          rotation: direction * 45,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: speed,
          },
        })
      })

      // Animate character and side carrots
      if (characterRef.current) {
        gsap.to(characterRef.current, {
          y: -100,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        })

        // Floating side carrots
        gsap.to(".side-carrot-left", {
          y: -150,
          x: -50,
          rotation: -20,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        })

        gsap.to(".side-carrot-right", {
          y: -150,
          x: 50,
          rotation: 20,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-[400vh] bg-[#ebe5d8] overflow-hidden relative">
      {/* Background pattern carrots */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => {
          const row = Math.floor(i / 10)
          const col = i % 10
          const isEven = row % 2 === 0

          return (
            <div
              key={i}
              ref={(el) => {
                if (el) carrotsRef.current[i] = el
              }}
              className="absolute"
              style={{
                left: `${col * 12 + (isEven ? 0 : 6)}%`,
                top: `${row * 12}%`,
                transform: "rotate(-45deg)",
              }}
            >
              <img src="/carrot-centent.svg" alt="" className="w-16 h-16 object-contain" />
            </div>
          )
        })}

        {/* Plus decorative elements */}
        {Array.from({ length: 30 }).map((_, i) => {
          const row = Math.floor(i / 10)
          const col = i % 10

          return (
            <div
              key={`plus-${i}`}
              className="absolute text-[#c4a676] text-2xl font-bold opacity-40"
              style={{
                left: `${col * 12 + 5}%`,
                top: `${row * 12 + 6}%`,
              }}
            >
              +
            </div>
          )
        })}
      </div>

      {/* Central character with carrots */}
      <div
        ref={characterRef}
        className="fixed top-[60vh] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-12"
      >
        <img src="/carrot.svg" alt="Carrot" className="side-carrot-left w-24 h-24 object-contain scale-x-[-1]" />
        <img src="/logo.svg" alt="Character" className="w-32 h-32 object-contain" />
        <img src="/carrot.svg" alt="Carrot" className="side-carrot-right w-24 h-24 object-contain" />
      </div>

      {/* Scroll indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-[#8b6f47] font-mono text-sm mb-2">Scroll Down</p>
        <div className="w-6 h-10 border-2 border-[#8b6f47] rounded-full mx-auto relative">
          <div className="w-1.5 h-3 bg-[#8b6f47] rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-bounce" />
        </div>
      </div>
    </div>
  )
}
