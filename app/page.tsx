"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

// Add these styles for the fade animations
const styles = {
  fadeIn: {
    opacity: 1,
    transition: "opacity 0.5s ease-in-out",
  },
  fadeOut: {
    opacity: 0,
    transition: "opacity 0.5s ease-in-out",
  },
}

// Add this right after the styles object
const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`

// Add responsive styles
const responsiveStyles = `
  @media (max-width: 768px) {
    .modal-container {
      width: 95% !important;
      padding: 0.75rem !important;
    }
    
    .carousel-slide {
      padding: 0 10px !important;
    }
    
    .carousel-nav-button {
      width: 30px !important;
      height: 30px !important;
    }
  }
`

export default function Home() {
  const [isLogoVisible, setIsLogoVisible] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedManufacturer, setSelectedManufacturer] = useState("Featured Products")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollYPosition, setScrollYPosition] = useState(0)
  const [autoScroll, setAutoScroll] = useState(true) // Added autoScroll state
  const modalRef = useRef<HTMLDivElement>(null)

  // Sample product data - replace with your actual data
  const products = [
    { name: "Round Separator", image: "/products/roundseperator.png", url: "https://sweco.com/separation/screener-round-separator.php" },
    { name: "Gratory Sifter", image: "/products/sifter.png", url: "https://sweco.com/separation/separator-atlas-gyratory-sifter.php" },
    { name: "Dry Collectors", image: "/products/drycollector.png", url: "https://info.aafintl.com/dust-collection-solutions#A" },
    { name: "Wet Collectors", image: "/products/rotoclone.png", url: "https://info.aafintl.com/dust-collection-solutions#B" },
    { name: "Hammer Mill", image: "/products/hammer-mill.png", url: "https://www.praterindustries.com/products/hammermills/" },
    { name: "Dry Fog", image: "/products/dry-fog.png", url: "https://nodust.com/solutions/dry-fog-solutions/" },
    { name: "Point Level Detection", image: "/products/point-level-detection.png", url: "https://bulkprosystems.com/our-products/point-level-detection/" },
  ]

  // Function to close modal and scroll to features
  const closeModal = () => {
    setIsModalVisible(false)
    setTimeout(() => {
      setIsLogoVisible(true)
    }, 300)

    // Navigate to features section
    document.querySelector("#features")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollYPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Initialize the logo-to-modal transition
  useEffect(() => {
    const storedManufacturer = sessionStorage.getItem("selectedManufacturer")
    const storedScrollPosition = sessionStorage.getItem("scrollPosition")

    if (storedManufacturer) {
      setSelectedManufacturer(storedManufacturer)
      setIsLogoVisible(false)
      setTimeout(() => {
        setIsModalVisible(true)
      }, 500)
    } else {
      // Automatically fade out logo and show modal after a delay
      const timer = setTimeout(() => {
        // Apply fade-out effect to logo
        const logoContainer = document.querySelector(".containers") as HTMLElement;
        if (logoContainer) {
          logoContainer.style.opacity = "0";
          logoContainer.style.transition = "opacity 0.8s ease-in-out";
        }

        // After logo fade-out completes, hide it and show modal
        setTimeout(() => {
          setIsLogoVisible(false)
          setTimeout(() => {
            setIsModalVisible(true)
          }, 100)
        }, 800) // Match this with the transition duration
      }, 2000) // Increased from 2000 to 4000 (4 seconds) before starting the transition

      return () => clearTimeout(timer)
    }

    if (storedScrollPosition) {
      window.scrollTo(0, Number.parseInt(storedScrollPosition))
      // Clear the stored values
      sessionStorage.removeItem("scrollPosition")
      sessionStorage.removeItem("selectedManufacturer")
    }
  }, [])

  // Auto-scroll carousel effect
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoScroll && products.length > 1) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1))
      }, 3000) // Change slide every 3 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoScroll, products.length])

  return (
    <>
      <style jsx global>{`
      ${keyframes}
      ${responsiveStyles}
    `}</style>
      <main>
        {/* Hero Section */}
        <section className="hero hero-loaded" style={{ position: "relative" }}>
          <div className="container">
            <div className="hero-content">
              {/* Logo Container */}
              {isLogoVisible && (
                <div className="containers">
                  <Image
                    id="part1"
                    className="part"
                    src="/logo/k.png"
                    alt="K"
                    width={800}
                    height={600}
                    priority={true}
                  />
                  <Image
                    id="part2"
                    className="part"
                    src="/logo/p.png"
                    alt="P"
                    width={800}
                    height={600}
                    priority={true}
                  />
                  <Image
                    id="part3"
                    className="part"
                    src="/logo/text.png"
                    alt="text"
                    width={800}
                    height={600}
                    priority={true}
                  />
                </div>
              )}

              {/* Modal Container */}
              {isModalVisible && (
                <div
                  ref={modalRef}
                  className="modal-container"
                  style={{
                    backgroundColor: "white",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    width: "90%", // Changed from 60% to 90% for mobile
                    maxWidth: "800px", // Added max-width
                    height: "auto", // Changed from 60% to auto
                    maxHeight: "80vh", // Added max-height with viewport units
                    margin: "0 auto",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                    opacity: 0,
                    animation: "fadeIn 0.5s forwards",
                    overflow: "auto", // Added overflow handling
                  }}
                >
                  <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>{selectedManufacturer?.toUpperCase()}</h2>

                  {/* Carousel container */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "450px", // Changed from fixed 450px
                      minHeight: "300px", // Added minimum height
                      maxHeight: "450px", // Added maximum height
                      overflow: "hidden",
                    }}
                    onMouseEnter={() => setAutoScroll(false)}
                    onMouseLeave={() => setAutoScroll(true)} // Added mouse event handlers
                  >
                    {/* Left arrow */}
                    {products.length > 1 && (
                      <button
                        onClick={() => setCurrentSlide((prev) => (prev === 0 ? products.length - 1 : prev - 1))}
                        className="carousel-nav-button"
                        style={{
                          position: "absolute",
                          left: "0",
                          top: "50%",
                          transform: "translateY(-50%)",
                          zIndex: 10,
                          background: "rgba(0, 0, 0, 0.5)",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        &#10094;
                      </button>
                    )}

                    {/* Carousel slides */}
                    <div
                      style={{
                        display: "flex",
                        transition: "transform 0.3s ease",
                        transform: `translateX(-${currentSlide * 100}%)`,
                        height: "100%",
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      {products.map((product, index) => (
                        <div
                          key={index}
                          className="carousel-slide"
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0 20px",
                            position: "absolute",
                            left: `${index * 100}%`,
                            top: 0,
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "auto", // Changed from fixed 150px
                              minHeight: "100px", // Added minimum height
                              marginBottom: "15px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={400}
                              height={300}
                              style={{
                                objectFit: "contain",
                                maxWidth: "100%", // Ensure image doesn't overflow
                                 // Limit image height
                              }}
                            />
                          </div>
                          <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "var(--primary, #0070f3)",
                              textDecoration: "none",
                              fontWeight: "500",
                              display: "inline-block",
                              padding: "8px 0",
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                            onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
                            onClick={() => {
                              // Store the current state in sessionStorage before navigating away
                              sessionStorage.setItem("scrollPosition", scrollYPosition.toString())
                              sessionStorage.setItem("selectedManufacturer", selectedManufacturer)
                            }}
                          >
                            {product.name}
                          </a>
                        </div>
                      ))}
                    </div>

                    {/* Right arrow */}
                    {products.length > 1 && (
                      <button
                        onClick={() => setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1))}
                        className="carousel-nav-button"
                        style={{
                          position: "absolute",
                          right: "0",
                          top: "50%",
                          transform: "translateY(-50%)",
                          zIndex: 10,
                          background: "rgba(0, 0, 0, 0.5)",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        &#10095;
                      </button>
                    )}
                  </div>

                  {/* Dots indicator */}
                  {products.length > 1 && (
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
                      {products.map((_, index) => (
                        <span
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          style={{
                            cursor: "pointer",
                            height: "10px",
                            width: "10px",
                            margin: "0 5px",
                            backgroundColor: currentSlide === index ? "var(--primary, #0070f3)" : "#bbb",
                            borderRadius: "50%",
                            display: "inline-block",
                            transition: "background-color 0.3s ease",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
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
        <section id="features" className="section-sm features">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title">About Us</h2>
              <p className="section-subtitle"></p>
            </div>
            <div className="about-text">
              <p>
                K & P Sales Engineers has been a trusted partner for Intermountain West customers for nearly a century,
                delivering expert solutions across a wide range of industries. Specializing in the handling of bulk
                materials, we cater to the food, nutraceuticals, pharmaceuticals, chemicals, and mining sectors. From
                sizing and separation to conveying, weighing, dust collection, and dust suppression, we offer tailored
                solutions to meet your unique needs. Get in touch with us today to discuss how we can optimize your
                application.
              </p>

              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Projects Completed</div>
                </div>

                <div className="stat-item">
                  <Link
                    href="linecard#features"
                    className="btn btn-primary"
                    style={{ marginTop: "2rem", alignContent: "center", justifyContent: "center" }}
                  >
                    View Our Equipment Partners
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section-sm features">
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
                  With over 50 years of experience, we bring unmatched knowledge to every project and client
                  relationship.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-cogs"></i>
                </div>
                <h3 className="feature-title">Quality Equipment</h3>
                <p>We partner with only the highest quality manufacturers to ensure reliability and performance.</p>
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
        <section className="section-sm" style={{ backgroundColor: "rgb(26, 26, 26)" }}>
          <div className="container">
            <div className="text-center">
              <h2 className="section-title">Our Services</h2>
              <p className="section-subtitle"></p>
            </div>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-image">
                  <Image
                    src="/stock/growth.jpg"
                    alt="Equipment Sales"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                    priority={true}
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
                    src="/stock/tech.jpg"
                    alt="Technical Support"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                    priority={true}
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
                    src="/stock/chip.jpg"
                    alt="Engineering Solutions"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                    priority={true}
                  />
                </div>
                <div className="service-content">
                  <h3 className="service-title">Engineering Solutions</h3>
                  <p className="service-text">
                    Custom engineered solutions designed to meet your unique requirements and challenges.
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
    </>
  )
}

