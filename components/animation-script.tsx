"use client"

import { useEffect } from "react"

export default function AnimationScript() {
  useEffect(() => {
    // Animation for logo parts
    const images = document.querySelectorAll(".part")
    let animationsCompleted = 0

    // Function to keep the animation displayed after it finishes
    function keepAnimationDisplayed() {
      // No need to fade out, just keep everything visible
      document.body.style.opacity = "1" // Ensure the page stays visible
    }

    // Loop through each image and listen for the animation end event
    images.forEach((image) => {
      image.addEventListener("animationend", () => {
        animationsCompleted++
        if (animationsCompleted === images.length) {
          // All images have finished their animations, keep the animation visible
          setTimeout(keepAnimationDisplayed, 600) // Optionally add a small delay before applying changes
        }
      })
    })

    // Smooth scroll for anchor links
    const scrollLinks = document.querySelectorAll(".scroll-down, .scroll-indicator")
    scrollLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const href = link.getAttribute("href")
        if (href) {
          const targetElement = document.querySelector(href)
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
            })
          }
        }
      })
    })

    return () => {
      // Clean up event listeners
      images.forEach((image) => {
        image.removeEventListener("animationend", () => {})
      })

      scrollLinks.forEach((link) => {
        link.removeEventListener("click", () => {})
      })
    }
  }, [])

  return null
}

