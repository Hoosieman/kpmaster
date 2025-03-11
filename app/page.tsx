"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export default function Home() {
  const [animationPhase, setAnimationPhase] = useState("initial") // "initial", "sliding", "carousel"
  const [selectedManufacturer, setSelectedManufacturer] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollYPosition, setScrollYPosition] = useState(0)
  const [autoScroll, setAutoScroll] = useState(true)
  const modalRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)

  // Sample product data - replace with your actual data
  const products = [
    {
      name: "Round Separator",
      image: "/products/roundseperator.png",
      url: "https://sweco.com/separation/screener-round-separator.php",
    },
    {
      name: "Gyratory Sifter",
      image: "/products/sifter.png",
      url: "https://sweco.com/separation/separator-atlas-gyratory-sifter.php",
    },
    {
      name: "Dry Collectors",
      image: "/products/drycollector.png",
      url: "https://info.aafintl.com/dust-collection-solutions#A",
    },
    {
      name: "Wet Collectors",
      image: "/products/rotoclone.png",
      url: "https://info.aafintl.com/dust-collection-solutions#B",
    },
    {
      name: "Hammer Mill",
      image: "/products/hammer-mill.png",
      url: "https://www.praterindustries.com/products/hammermills/",
    },

    {
      name: "Point Level Detection",
      image: "/products/point-level-detection.png",
      url: "https://bulkprosystems.com/our-products/point-level-detection/",
    },
  ]

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollYPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Initialize the logo animation and transition to carousel
  useEffect(() => {
    const storedManufacturer = sessionStorage.getItem("selectedManufacturer")
    const storedScrollPosition = sessionStorage.getItem("scrollPosition")

    if (storedManufacturer) {
      setSelectedManufacturer(storedManufacturer)
      setAnimationPhase("carousel")
    } else {
      // Start the animation sequence
      const initialTimer = setTimeout(() => {
        // Start sliding up animation
        setAnimationPhase("sliding")

        // After sliding animation completes, show carousel
        const carouselTimer = setTimeout(() => {
          setAnimationPhase("carousel")
        }, 800) // Match this with the transition duration

        return () => clearTimeout(carouselTimer)
      }, 2000) // Time before starting the slide-up animation

      return () => clearTimeout(initialTimer)
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

    if (autoScroll && products.length > 1 && animationPhase === "carousel") {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1))
      }, 4000) // Change slide every 3 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoScroll, products.length, animationPhase])

  return (
    <>
      <style jsx global>{`
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
          
          /* Hide preview containers on mobile */
          .preview-container {
            display: none !important;
          }
        }

      
        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 80vh;
          position: relative; /* Added to create positioning context */
        }

        .containers {
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.8s ease-out, scale 0.8s ease-out;
          margin-bottom: 2rem;
        }

        

        .carousel .containers {
        
          scale: 0.4;
          position: absolute;
          top: 0;
          z-index: 10;
        }

        /* Add this new CSS rule to hide the text part of the logo when in carousel state */
        /* .carousel .containers #part3 {
          display: none;
        } */

        /* Replace it with a rule that keeps the text visible but possibly adjusts its size or position */
        .carousel .containers #part3 {
          display: block; /* Ensure it's visible */
        }

        .modal-container {
          margin-top: 60px;
          opacity: 0;
          transition: opacity 0.5s ease-in;
          display: none;
        }

        .carousel .modal-container {
          opacity: 1;
          display: block;
        }

        .scroll-down {
          opacity: 0;
          transition: opacity 0.5s ease-in;
        }

        .carousel .scroll-down {
          opacity: 1;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      <main>
        {/* Hero Section */}
        <section className={`hero hero-loaded ${animationPhase}`} style={{ position: "relative" }}>
          <div className="container">
            <div className="hero-content" ref={heroContentRef}>
              {/* Logo Container */}
              <div className="containers">
                <Image id="part1" className="part" src="/logo/k.png" alt="K" width={800} height={600} priority={true} />
                <Image
                  id="part2"
                  className="part"
                  src="/logo/ppp.png"
                  alt="P"
                  width={800}
                  height={600}
                  priority={true}
                />
                <Image
                  id="part3"
                  className="part"
                  src="/logo/texty.png"
                  alt="text"
                  width={800}
                  height={600}
                  priority={true}
                />
              </div>

              {/* Modal Container with Carousel */}
              <div
                ref={modalRef}
                className="modal-container"
                style={{
                  backgroundColor: "white",
                  padding: "1rem",
                  opacity: 0,
                  animation: "fadeIn 1.5s ease-in forwards",
                  width: "100%",
                  maxWidth: "700px",
                  height: "auto",
                  maxHeight: "90vh",
                  margin: "0 auto",
                  overflow: "auto",
                  position: "relative",
                  border: "10px solid white",
                  borderRadius: "50%", // Ensure modal has positioning context
                }}
              >
                <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>{selectedManufacturer?.toUpperCase()}</h2>

                {/* Carousel container */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "800px",
                    minHeight: "300px",
                    maxHeight: "600px",
                    overflow: "hidden",
                    // Keep this as hidden for the main container
                  }}
                >
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
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            // Store the current state in sessionStorage before navigating away
                            sessionStorage.setItem("scrollPosition", scrollYPosition.toString())
                            sessionStorage.setItem("selectedManufacturer", selectedManufacturer)
                          }}
                          style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}
                        >
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={800}
                            height={600}
                            style={{
                              objectFit: "contain",
                              maxWidth:
                                product.name === "Hammer Mill" ||
                                product.name === "Point Level Detection" ||
                                product.name === "Wet Collectors"
                                  ? "70%"
                                  : "100%",
                            }}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview containers - positioned outside the modal */}
              {products.length > 1 && animationPhase === "carousel" && (
                <>
                  {/* Previous item preview */}
                  <div
                    className="preview-container"
                    style={{
                      position: "absolute",
                      left: "calc(50% - 650px)", // Updated left position
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "100px",
                      height: "150px",
                      zIndex: 20,
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                    onClick={() => {
                      setAutoScroll(false)
                      setCurrentSlide(currentSlide === 0 ? products.length - 1 : currentSlide - 1)
                    }}
                    onMouseEnter={() => setAutoScroll(false)}
                    onMouseLeave={() => setAutoScroll(true)}
                  >
                    <Image
                      src={
                        products[currentSlide === 0 ? products.length - 1 : currentSlide - 1].image ||
                        "/placeholder.svg"
                      }
                      alt="Previous item"
                      width={100}
                      height={150}
                      style={{
                        objectFit: "contain",
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                    />
                  </div>

                  {/* Next item preview */}
                  <div
                    className="preview-container"
                    style={{
                      position: "absolute",
                      right: "calc(50% - 650px)", // Updated right position
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "100px",
                      height: "150px",
                      zIndex: 20,
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                    onClick={() => {
                      setAutoScroll(false)
                      setCurrentSlide(currentSlide === products.length - 1 ? 0 : currentSlide + 1)
                    }}
                    onMouseEnter={() => setAutoScroll(false)}
                    onMouseLeave={() => setAutoScroll(true)}
                  >
                    <Image
                      src={
                        products[currentSlide === products.length - 1 ? 0 : currentSlide + 1].image ||
                        "/placeholder.svg"
                      }
                      alt="Next item"
                      width={100}
                      height={150}
                      style={{
                        objectFit: "contain",
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <Link
            href="#features"
            className="scroll-down"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector("#features")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
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

