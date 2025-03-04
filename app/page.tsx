"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from 'lucide-react'
import LoadingScreen from "../components/LoadingScreen"

export default function Home() {
  const [isLoading, setIsLoading] = useState(() => {
    // Always show loading screen initially to ensure proper image loading
    return true
  })
  const [logoAnimationStarted, setLogoAnimationStarted] = useState(false)
  const [backgroundLoaded, setBackgroundLoaded] = useState(false)

  // Track if all images have loaded
  const imagesLoaded = useRef(0)
  const totalImages = useRef(0)

  useEffect(() => {
    // If we're not showing the loading screen, start logo animation immediately
    if (!isLoading) {
      setLogoAnimationStarted(true)
      return
    }

    // Mark that user has visited the home page
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasVisitedHome", "true")
    }

    // Preload all images first
    const preloadImages = async () => {
      // Get all image sources from the page
      const imageSources = [
        "/logo/K1.png",
        "/logo/K2.png",
        "/logo/and2.png",
        "/logo/PP1.png",
        "/logo/PP2.png",
        "/logo/text2.png",
        // Use Next.js Image Optimization for external images
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070",
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070",
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070",
        "https://kpsalesengineers.com/wp-content/uploads/2017/11/christopher-baumeister-304888.jpg",
        "https://kpsalesengineers.com/wp-content/uploads/2017/11/ant-rozetsky-272965.jpg",
      ]

      // Add your hero background image to the preload list
      // Replace with the actual URL of your hero background image
      const heroBackgroundUrl = "https://kpsalesengineers.com/wp-content/uploads/2017/11/ant-rozetsky-272965.jpg" // Update this with your actual background image URL
      imageSources.push(heroBackgroundUrl)

      totalImages.current = imageSources.length

      // Preload each image
      const preloadPromises = imageSources.map((src) => {
        return new Promise((resolve) => {
          const img = new window.Image()

          // Set crossOrigin for external images to avoid CORS issues
          img.crossOrigin = "anonymous"
          img.src = src

          // Special handling for hero background
          if (src === heroBackgroundUrl) {
            img.onload = () => {
              setBackgroundLoaded(true)
              imagesLoaded.current++
              resolve(true)
            }
          } else {
            img.onload = () => {
              imagesLoaded.current++
              resolve(true)
            }
          }

          img.onerror = () => {
            console.error(`Failed to load image: ${src}`)
            if (src === heroBackgroundUrl) {
              // Even if background fails, mark it as loaded to continue
              setBackgroundLoaded(true)
            }
            imagesLoaded.current++
            resolve(false)
          }
        })
      })

      try {
        // Wait for all images to preload
        await Promise.all(preloadPromises)
        console.log(`Loaded ${imagesLoaded.current} of ${totalImages.current} images`)
      } catch (error) {
        console.error("Error preloading images:", error)
      }

      // Hide loading screen and start logo animation
      setIsLoading(false)
      setLogoAnimationStarted(true)
    }

    preloadImages()

    // Fallback: hide loading screen after 8 seconds regardless
    // Increased from 5 to 8 seconds to give more time for background loading
    const timeout = setTimeout(() => {
      console.log("Fallback timeout triggered - forcing load completion")
      setBackgroundLoaded(true)
      setIsLoading(false)
      setLogoAnimationStarted(true)
    }, 8000)

    return () => clearTimeout(timeout)
  }, [isLoading])

  // If still loading, show loading screen
  if (isLoading) {
    return <LoadingScreen progress={(imagesLoaded.current / totalImages.current) * 100} />
  }

  return (
    <main>
      {/* Hero Section */}
      <section className={`hero ${backgroundLoaded ? 'hero-loaded' : ''}`}>
        <div className="container">
          <div className="hero-content">
            <div className="containers">
              <Image
                id="part1"
                className={`part ${logoAnimationStarted ? "animate-part1" : "hidden-part"}`}
                src="/logo/K1.png"
                alt="K"
                width={800}
                height={400}
                priority={true}
              />
              <Image
                id="part2"
                className={`part ${logoAnimationStarted ? "animate-part2" : "hidden-part"}`}
                src="/logo/K2.png"
                alt="K"
                width={800}
                height={400}
                priority={true}
              />
              <Image
                id="part3"
                className={`part ${logoAnimationStarted ? "animate-part3" : "hidden-part"}`}
                src="/logo/and2.png"
                alt="&"
                width={800}
                height={400}
                priority={true}
              />
              <Image
                id="part4"
                className={`part ${logoAnimationStarted ? "animate-part4" : "hidden-part"}`}
                src="/logo/PP1.png"
                alt="P"
                width={800}
                height={400}
                priority={true}
              />
              <Image
                id="part5"
                className={`part ${logoAnimationStarted ? "animate-part5" : "hidden-part"}`}
                src="/logo/PP2.png"
                alt="P"
                width={800}
                height={400}
                priority={true}
              />
              <Image
                id="part6"
                className={`part ${logoAnimationStarted ? "animate-part6" : "hidden-part"}`}
                src="/logo/text2.png"
                alt="Sales Engineers"
                width={800}
                height={400}
                priority={true}
              />
            </div>
            <div className={`hero-cta ${logoAnimationStarted ? "animate-cta" : "hidden-cta"}`}>
              <Link href="#features" className="btn btn-primary btn-lg">
                Learn More
              </Link>
              <Link href="/contact" className="btn btn-outline btn-lg" style={{ color: "white", borderColor: "white" }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        <Link
          href="#features"
          className="scroll-down"
          onClick={(e) => {
            e.preventDefault() // Prevent default anchor behavior

            // Safely handle the possibility of null with optional chaining
            document.querySelector("#features")?.scrollIntoView({
              behavior: "smooth",
              block: "start", // Align at the top of the viewport
            })
          }}
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="section features">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle"></p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-medal"></i>
              </div>
              <h3 className="feature-title">Industry Expertise</h3>
              <p>
                With over 40 years of experience, we bring unmatched knowledge to every project and client relationship.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-cogs"></i>
              </div>
              <h3 className="feature-title">Quality Equipment</h3>
              <p>We represent only the highest quality manufacturers to ensure reliability and performance.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3 className="feature-title">Dedicated Support</h3>
              <p>Our team provides responsive technical support and service throughout the equipment lifecycle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section" style={{ backgroundColor: "var(--gray-100)" }}>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle"></p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-image">
                <Image
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070"
                  alt="Equipment Sales"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  unoptimized={false}
                />
              </div>
              <div className="service-content">
                <h3 className="service-title">Equipment Sales</h3>
                <p className="service-text">
                  High-quality industrial equipment from leading manufacturers to meet your specific requirements.
                </p>
                <Link href="/linecard" className="line-card-link">
                  View Equipment <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="service-card">
              <div className="service-image">
                <Image
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070"
                  alt="Technical Support"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  unoptimized={false}
                />
              </div>
              <div className="service-content">
                <h3 className="service-title">Technical Support</h3>
                <p className="service-text">
                  Expert guidance and support for all your equipment needs, from selection to implementation.
                </p>
                <Link href="/contact" className="line-card-link">
                  Contact Support <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="service-card">
              <div className="service-image">
                <Image
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070"
                  alt="Engineering Solutions"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  unoptimized={false}
                />
              </div>
              <div className="service-content">
                <h3 className="service-title">Engineering Solutions</h3>
                <p className="service-text">
                  Custom engineering solutions tailored to your unique requirements and challenges.
                </p>
                <Link href="/contact" className="line-card-link">
                  Request Consultation <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-sm cta">
        <div className="container">
          <h2 className="cta-title">Ready to work with us?</h2>
          <p className="cta-text">
            Contact our team today to discuss your industrial equipment needs and discover how we can help you achieve
            your goals.
          </p>
          <Link href="/contact" className="btn btn-lg" style={{ backgroundColor: "white", color: "var(--primary)" }}>
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  )
}
