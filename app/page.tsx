"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import LoadingScreen from "../components/LoadingScreen"

export default function Home() {
  const [isLoading, setIsLoading] = useState(() => {
    // Check if this is the initial page load
    if (typeof window !== "undefined") {
      // If we have a record in sessionStorage, this isn't the first load
      const hasVisited = sessionStorage.getItem("hasVisitedHome")
      if (hasVisited) {
        return false // Skip loading screen
      }
    }
    return true // Show loading screen on first visit
  })
  const [logoAnimationStarted, setLogoAnimationStarted] = useState(false)

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
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ]

      totalImages.current = imageSources.length

      // Preload each image
      const preloadPromises = imageSources.map((src) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.src = src
          img.onload = () => {
            imagesLoaded.current++
            resolve(true)
          }
          img.onerror = () => {
            imagesLoaded.current++
            resolve(false)
          }
        })
      })

      // Wait for all images to preload
      await Promise.all(preloadPromises)

      // Hide loading screen and start logo animation
      setIsLoading(false)
      setLogoAnimationStarted(true)
    }

    preloadImages()

    // Fallback: hide loading screen after 8 seconds regardless
    const timeout = setTimeout(() => {
      setIsLoading(false)
      setLogoAnimationStarted(true)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isLoading])

  // If still loading, show loading screen
  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
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
              />
              <Image
                id="part2"
                className={`part ${logoAnimationStarted ? "animate-part2" : "hidden-part"}`}
                src="/logo/K2.png"
                alt="K"
                width={800}
                height={400}
              />
              <Image
                id="part3"
                className={`part ${logoAnimationStarted ? "animate-part3" : "hidden-part"}`}
                src="/logo/and2.png"
                alt="&"
                width={800}
                height={400}
              />
              <Image
                id="part4"
                className={`part ${logoAnimationStarted ? "animate-part4" : "hidden-part"}`}
                src="/logo/PP1.png"
                alt="P"
                width={800}
                height={400}
              />
              <Image
                id="part5"
                className={`part ${logoAnimationStarted ? "animate-part5" : "hidden-part"}`}
                src="/logo/PP2.png"
                alt="P"
                width={800}
                height={400}
              />
              <Image
                id="part6"
                className={`part ${logoAnimationStarted ? "animate-part6" : "hidden-part"}`}
                src="/logo/text2.png"
                alt="Sales Engineers"
                width={800}
                height={400}
              />
            </div>
            <div className={`hero-cta ${logoAnimationStarted ? "animate-cta" : "hidden-cta"}`}>
              <Link href="#about" className="btn btn-primary btn-lg">
                Learn More
              </Link>
              <Link href="/contact" className="btn btn-outline btn-lg" style={{ color: "white", borderColor: "white" }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        <Link href="#features" className={`scroll-down ${logoAnimationStarted ? "animate-scroll" : "hidden-scroll"}`}>
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

      {/* About Section Preview */}
      <section id="about" className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">About K&P Sales</h2>
              <p>
                K & P Sales Engineers has provided solutions for our Intermountain West customers for almost 100 years.
                We are experts in the handling of bulk products specializing in the handling of food, nutraceuticals,
                pharmaceuticals, chemicals and mining applications. Whether you have needs to size, separate, convey,
                weigh, dust collection or dust suppression for your material, we have a solution for you. Contact us to
                discuss your application.
              </p>

              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-number">40+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Projects Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">20+</div>
                  <div className="stat-label">Manufacturers</div>
                </div>
              </div>
              <Link href="#about" className="btn btn-primary btn-lg" style={{ marginTop: "2rem" }}>
                Learn More About Us
              </Link>
            </div>
            <div className="about-image">
              <Image
                src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Industrial Equipment"
                width={600}
                height={400}
              />
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
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Equipment Sales"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
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
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Technical Support"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
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
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Engineering Solutions"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
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

