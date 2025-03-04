"use client"

import { useEffect } from "react"

export default function AnimationScript() {
  useEffect(() => {
    const images = document.querySelectorAll(".part")
    let animationsCompleted = 0

    function keepAnimationDisplayed() {
      document.body.style.opacity = "1"
    }

    function handleAnimationEnd() {
      animationsCompleted++
      if (animationsCompleted === images.length) {
        setTimeout(keepAnimationDisplayed, 600)
      }
    }

    images.forEach((image) => {
      image.addEventListener("animationend", handleAnimationEnd)
    })

    const scrollLinks = document.querySelectorAll(".scroll-down, .scroll-indicator")

    // Correct the event listener by using a generic 'Event' type and a type guard for MouseEvent
    function handleScrollClick(e: Event) {
      e.preventDefault()

      // Type guard to narrow down the event to MouseEvent
      const target = e.currentTarget as HTMLElement
      const href = target.getAttribute("href")

      if (href) {
        const targetElement = document.querySelector(href)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    scrollLinks.forEach((link) => {
      link.addEventListener("click", handleScrollClick as EventListener)
    })

    return () => {
      images.forEach((image) => {
        image.removeEventListener("animationend", handleAnimationEnd)
      })

      scrollLinks.forEach((link) => {
        link.removeEventListener("click", handleScrollClick as EventListener)
      })
    }
  }, [])

  return null
}
