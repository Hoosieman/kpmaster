"use client"

import { useEffect } from "react"
import AnimationScript from "@/components/animation-script"

export default function HomeClient() {
  useEffect(() => {
    // Listen for the end of the animation using the `animationend` event
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

    return () => {
      images.forEach((image) => {
        image.removeEventListener("animationend", () => {})
      })
    }
  }, [])

  return <AnimationScript />
}

