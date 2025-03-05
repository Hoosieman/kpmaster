"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

// Define a type for product items with URLs
type ProductItem = {
  name: string
  url: string
}

export default function LineCard() {
  // State for modal visibility and selected manufacturer's data
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<ProductItem[] | null>(null)
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null)

  // Scroll position variable
  const [scrollYPosition, setScrollYPosition] = useState(0)

  // Effect to restore state when returning from external links
  useEffect(() => {
    // Check if we're returning from an external link
    const savedScrollPosition = sessionStorage.getItem("scrollPosition")
    const savedManufacturer = sessionStorage.getItem("selectedManufacturer")

    if (savedScrollPosition && savedManufacturer) {
      // Restore the scroll position
      window.scrollTo(0, Number.parseInt(savedScrollPosition))

      // If a modal was open, reopen it
      if (savedManufacturer && savedManufacturer !== "") {
        setSelectedManufacturer(savedManufacturer)
        setModalContent(manufacturerData[savedManufacturer].products)
        setIsModalOpen(true)
        setScrollYPosition(Number.parseInt(savedScrollPosition))
      }

      // Clear the stored data
      sessionStorage.removeItem("scrollPosition")
      sessionStorage.removeItem("selectedManufacturer")
    }
  }, [])

  // Manufacturer product data with descriptions and URLs
  const manufacturerData: Record<string, { products: ProductItem[]; description: string }> = {
    Sweco: {
      products: [
        { name: "Product 1", url: "https://www.sweco.com/product1" },
        { name: "Product 2", url: "https://www.sweco.com/product2" },
      ],
      description: "Screening Equipment",
    },
    aaf: {
      products: [
        { name: "Wet Dust Collectors", url: "https://info.aafintl.com/dust-collection-solutions#B" },
        { name: "Dry Dust Colletors", url: "https://info.aafintl.com/dust-collection-solutions#A" },
        { name: "Oil Mist Collectors", url: "https://info.aafintl.com/dust-collection-solutions#C" },
      ],
      description: "Dust Collectors",
    },
    prater: {
      products: [
        { name: "Product Red", url: "https://www.prater.com/product-red" },
        { name: "Product Blue", url: "https://www.prater.com/product-blue" },
      ],
      description: "Particle Size Reduction",
    },
    dsi: {
      products: [
        { name: "Product 1", url: "https://www.dsi.com/product1" },
        { name: "Product 2", url: "https://www.dsi.com/product2" },
      ],
      description: "Industrial Fans",
    },
    andco: {
      products: [
        { name: "Product A", url: "https://www.andco.com/producta" },
        { name: "Product B", url: "https://www.andco.com/productb" },
      ],
      description: "Vibration Systems",
    },
    bulkpro: {
      products: [
        { name: "Product 3", url: "https://www.bulkpro.com/product3" },
        { name: "Product 4", url: "https://www.bulkpro.com/product4" },
      ],
      description: "Bulk Handling",
    },
    bunting: {
      products: [
        { name: "Product X", url: "https://www.bunting.com/productx" },
        { name: "Product Y", url: "https://www.bunting.com/producty" },
        { name: "Product Z", url: "https://www.bunting.com/productz" },
      ],
      description: "Magnets & Separation",
    },
    formpak: {
      products: [
        { name: "Product Alpha", url: "https://www.formpak.com/productalpha" },
        { name: "Product Beta", url: "https://www.formpak.com/productbeta" },
      ],
      description: "Bagging Systems",
    },
    kinematics: {
      products: [
        { name: "Product 101", url: "https://www.kinematics.com/product101" },
        { name: "Product 102", url: "https://www.kinematics.com/product102" },
      ],
      description: "Conveyors & Equipment",
    },
    orthman: {
      products: [
        { name: "Product A", url: "https://www.orthman.com/producta" },
        { name: "Product B", url: "https://www.orthman.com/productb" },
      ],
      description: "Agricultural Equipment",
    },
  }

  // Open modal with specific manufacturer's products
  const openModal = (manufacturer: string) => {
    // Save the current scroll position
    setScrollYPosition(window.scrollY)

    setModalContent(manufacturerData[manufacturer].products)
    setSelectedManufacturer(manufacturer)
    setIsModalOpen(true)

    // Instead of changing body position, we'll use overflow: hidden
    // This prevents scrolling without changing the scroll position
    document.body.style.overflow = "hidden"
  }

  // Close modal
  const closeModal = () => {
    // Update state
    setIsModalOpen(false)
    setModalContent(null)
    setSelectedManufacturer(null)

    // Restore body scrolling
    document.body.style.overflow = ""

    // No need to manually scroll as the position was never changed
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="containers">
              {/* Directly show images without loading screen */}
              <Image id="part1" className="part" src="/logo/K1.png" alt="K" width={800} height={600} priority={true} />
              <Image id="part2" className="part" src="/logo/K2.png" alt="K" width={800} height={600} priority={true} />
              <Image
                id="part3"
                className="part"
                src="/logo/and2.png"
                alt="&"
                width={800}
                height={600}
                priority={true}
              />
              <Image id="part4" className="part" src="/logo/PP1.png" alt="P" width={800} height={600} priority={true} />
              <Image id="part5" className="part" src="/logo/PP2.png" alt="P" width={800} height={600} priority={true} />
              <div
                id="part6"
                className="part" // Apply the bold font class here
                style={{
                  fontSize: "55px",
                  textAlign: "center",
                  color: "white",
                  padding: "250px",
                }}
              >
                <p>LINE CARD</p>
              </div>
            </div>
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

      {/* Manufacturers Section */}
      <section id="features" className="manufacturer-section">
        <div className="container">
          <div className="manufacturer-category">
            <h2 className="section-title">Manufacturers</h2>
            <div className="manufacturer-grid">
              {Object.keys(manufacturerData).map((manufacturer) => (
                <div className="manufacturer-item" key={manufacturer}>
                  <div className="manufacturer-logo">
                    <Image
                      src={`/images/${manufacturer.toLowerCase()}.png`}
                      alt={manufacturer}
                      width={200}
                      height={80}
                    />
                  </div>
                  <div className="manufacturer-info">
                    <p className="manufacturer-description" style={{ fontWeight: "bold" }}>
                      {manufacturerData[manufacturer].description}
                    </p>
                    <button
                      className="manufacturer-link"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        openModal(manufacturer)
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "underline",
                        padding: 0,
                        font: "inherit",
                        color: "inherit",
                      }}
                    >
                      Products <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-sm cta">
        <div className="container">
          <h2 className="cta-title">Need help selecting the right equipment?</h2>
          <p className="cta-text">
            Our team of experts is ready to assist you in finding the perfect solution for your specific requirements.
          </p>
          <Link href="/contact" className="btn btn-lg" style={{ backgroundColor: "white", color: "var(--primary)" }}>
            Contact Our Team
          </Link>
        </div>
      </section>

      {/* Modal Section - Updated with clickable links */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "0.5rem",
              maxWidth: "500px",
              width: "90%",
              maxHeight: "80vh",
              overflow: "auto",
              textAlign: "center", // Added textAlign: "center"
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              Products for {selectedManufacturer?.toUpperCase()}
            </h2>

            {Array.isArray(modalContent) && modalContent.length > 0 ? (
              <ul style={{ listStyleType: "none", padding: 0, textAlign: "center" }}>
                {modalContent.map((product, index) => (
                  <li key={index} style={{ margin: "10px 0" }}>
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
                      onClick={(e) => {
                        // Store the current state in sessionStorage before navigating away
                        sessionStorage.setItem("scrollPosition", scrollYPosition.toString())
                        sessionStorage.setItem("selectedManufacturer", selectedManufacturer || "")
                      }}
                    >
                      {product.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products available</p>
            )}

            <button
              className="btn"
              onClick={closeModal}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "var(--primary, #0070f3)",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                display: "block",
                margin: "20px auto 0",
                width: "120px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

