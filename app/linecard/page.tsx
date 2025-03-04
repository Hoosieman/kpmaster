"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export default function LineCard() {
  // State for modal visibility and selected manufacturer's data
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<string[] | null>(null)
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null)

  // Manufacturer product data
  const manufacturerData: Record<string, string[]> = {
    aaf: ["Product 1", "Product 2", "Product 3"],
    andco: ["Product A", "Product B"],
    bunting: ["Product X", "Product Y", "Product Z"],
    dsi: ["Product 1", "Product 2"],
    formpak: ["Product Alpha", "Product Beta"],
    kinematics: ["Product 101", "Product 102"],
    orthman: ["Product A", "Product B"],
    prater: ["Product Red", "Product Blue"],
    Sweco: ["Product 1", "Product 2"],
    thermo: ["Product X", "Product Y"],
  }

  // Open modal with specific manufacturer's products
  const openModal = (manufacturer: string) => {
    // Prevent any default behavior that might cause scrolling
    setModalContent(manufacturerData[manufacturer])
    setSelectedManufacturer(manufacturer)
    setIsModalOpen(true)

    // Prevent body scrolling but maintain position
    document.body.style.position = "fixed"
    document.body.style.top = `-${window.scrollY}px`
    document.body.style.width = "100%"
  }

  // Close modal
  const closeModal = () => {
    // Get the scroll position from the body's top property
    const scrollY = document.body.style.top

    setIsModalOpen(false)
    setModalContent(null)
    setSelectedManufacturer(null)

    // Restore body scrolling and position
    document.body.style.position = ""
    document.body.style.top = ""
    document.body.style.width = ""

    // Scroll back to the original position
    window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-linecard">
        <div className="hero-linecard-content">
          <h1 className="hero-linecard-title">Line Card</h1>
          <p className="hero-linecard-subtitle">Service | Support | Success</p>
        </div>
        <Link href="#manufacturers" className="scroll-indicator">
          <ChevronDown className="text-white" />
        </Link>
      </section>

      {/* Manufacturers Section */}
      <section id="manufacturers" className="manufacturer-section">
        <div className="container">
          <div className="manufacturer-category">
            <h2 className="section-title">Manufacturers</h2>
            <p className="section-subtitle">
              High-quality pumps and fluid handling equipment for industrial applications
            </p>

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
                    <p></p>
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

      {/* Modal Section */}
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
            }}
          >
            <h2>Products for {selectedManufacturer}</h2>

            {Array.isArray(modalContent) && modalContent.length > 0 ? (
              <ul>
                {modalContent.map((product, index) => (
                  <li key={index}>{product}</li>
                ))}
              </ul>
            ) : (
              <p>No products available</p>
            )}

            <button className="btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

