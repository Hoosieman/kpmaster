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

    function handleScrollClick(e) {
      e.preventDefault()
      const href = e.currentTarget.getAttribute("href")
      if (href) {
        const targetElement = document.querySelector(href)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    scrollLinks.forEach((link) => {
      link.addEventListener("click", handleScrollClick)
    })

    return () => {
      images.forEach((image) => {
        image.removeEventListener("animationend", handleAnimationEnd)
      })

      scrollLinks.forEach((link) => {
        link.removeEventListener("click", handleScrollClick)
      })
    }
  }, [])

  return null
}
