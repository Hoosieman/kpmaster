"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

// Define a type for product items with URLs and images
type ProductItem = {
  name: string
  url: string
  image?: string
}

export default function LineCard() {
  // State for modal visibility and selected manufacturer's data
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<ProductItem[] | null>(null)
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0) // Added state for carousel navigation

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
        { name: "Round Separators", url: "https://sweco.com/separation/screener-round-separator.php", image: "/products/roundseperator.png" },
        { name: "Sifters", url: "https://sweco.com/separation/separator-atlas-gyratory-sifter.php", image: "/products/sifter.png" },
        { name: "Rectangular Separators", url: "https://sweco.com/separation/separator-atlas-gyratory-sifter.php", image: "/products/rectseperator.png" },
      ],
      description: "Separation Equipment",
    },
    aaf: {
      products: [
        {
          name: "Wet Collectors",
          url: "https://info.aafintl.com/dust-collection-solutions#B",
          image: "/products/wetcollector.png",
        },
        {
          name: "Dry Colletors",
          url: "https://info.aafintl.com/dust-collection-solutions#A",
          image: "/products/drycollector.png",
        },
        {
          name: "Bag Collectors",
          url: "https://info.aafintl.com/dust-collection-solutions",
          image: "/products/bagcollector.png",
        },
        {
          name: "Oil Collectors",
          url: "https://info.aafintl.com/dust-collection-solutions#C",
          image: "/products/oilcollector.png",
        },
      ],
      description: "Dust Collectors",
    },
    prater: {
      products: [
        {
          name: "Hammer Mills",
          url: "https://www.praterindustries.com/products/hammermills/",
          image: "/products/hammer-mill.png",
        },
        {
          name: "Air Classifiers",
          url: "https://www.praterindustries.com/products/air-classifiers/",
          image: "/products/air-classifier.png",
        },
        {
          name: "Rotary Air Locks",
          url: "https://www.praterindustries.com/products/rotary-airlock-valves/",
          image: "/products/rotary-air-lock.png",
        },
        {
          name: "Lump Breakers",
          url: "https://www.praterindustries.com/products/lump-breakers/",
          image: "/products/lump-breaker.png",
        },
      ],
      description: "Particle Management",
    },
    dsi: {
      products: [
        { name: "Dry Fog", url: "https://nodust.com/solutions/dry-fog-solutions/", image: "/products/dry-fog.png" },
        { name: "Wind Fence", url: "https://nodust.com/solutions/wind-fence/", image: "/products/wind-fence.png" },
        { name: "Water-Spray", url: "https://nodust.com/solutions/nesco-solutions/", image: "/products/water-spray.jpg" },
      ],
      description: "Dust Supression",
    },
    andco: {
      products: [
        { name: "Eagle Actuator", url: "https://dresserutility.com/project/andco-eagle/", image: "/products/eagle-actuator.png" },
        { name: "7000 Series", url: "https://dresserutility.com/project/andco-7000-series/", image: "/products/7000-series.png" },
      ],
      description: "Electric Actuators",
    },
    bulkpro: {
      products: [
        { name: "Conveyor Switches", url: "https://bulkprosystems.com/our-products/conveyor-switches/", image: "/products/conveyor-switch.png" },
        { name: "Point Level Detection", url: "https://bulkprosystems.com/our-products/point-level-detection/", image: "/products/point-level-detection.png" },
        { name: "Speed Switches", url: "https://bulkprosystems.com/our-products/speed-switches/", image: "/products/speed-switches.png" },
      ],
      description: "Conveyor Protection",
    },
    bunting: {
      products: [
        { name: "Magnetic Separation", url: "https://buntingmagnetics.com/", image: "/products/magnetic-seperator.png" },
      ],
      description: "Magnetic Separation",
    },
    formpak: {
      products: [
        {
          name: "Bulk Bag Unloaders",
          url: "https://formpakinc.com/product-category/bulk-bag-unloaders/",
          image: "/products/bulk-bag-unloader.png",
        },
        {
          name: "Bulk Bag Fillers",
          url: "https://formpakinc.com/product-category/bulk-bag-fillers/",
          image: "/products/bulk-bag-filler.png",
        },
        {
          name: "Flexible Screw Conveyors",
          url: "https://formpakinc.com/product-category/flexible-screw-conveyors/",
          image: "/products/flexible-screw-conveyor.png",
        },
      ],
      description: "Bulk Bag Handling",
    },
    kinematics: {
      products: [
        {
          name: "Vibratory Conveyors",
          url: "https://www.generalkinematics.com/vibratory-conveyors/",
          image: "/products/vibratory-conveyor.png",
        },
        {
          name: "Vibratory Cooling & Drying",
          url: "https://www.generalkinematics.com/cooling-and-drying/",
          image: "/products/vibratory-dryer.png",
        },
        {
          name: "Vibratory Grinding",
          url: "https://www.kinematics.com/product102",
          image: "/products/vibratory-grinder.png",
        },
      ],
      description: "Vibratory Equipment",
    },
    orthman: {
      products: [
        { name: "Screw Conveyor", url: "https://orthmanconveying.com/conveying/screw-conveyors/", image: "/products/screw-conveyor.png" },
        { name: "Bucket Elevator", url: "https://orthmanconveying.com/conveying/bucket-elevators/", image: "/products/bucket-elevator.png" },
        { name: "Belt Conveyor", url: "https://orthmanconveying.com/conveying/belt-conveyors/", image: "/products/belt-conveyor.png" },
      ],
      description: "Conveying",
    },
  }

  // Open modal with specific manufacturer's products
  const openModal = (manufacturer: string) => {
    // Save the current scroll position
    setScrollYPosition(window.scrollY)

    setModalContent(manufacturerData[manufacturer].products)
    setSelectedManufacturer(manufacturer)
    setIsModalOpen(true)
    setCurrentSlide(0) // Reset to first slide when opening modal

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
      <section className="hero2">
        <div className="container">
          <div className="hero-content">
            <div className="containers">
              {/* Directly show images without loading screen */}
              <Image
                id="part1"
                className="part"
                src="/images/kpwhite.png"
                alt="K"
                width={800}
                height={600}
                priority={true}
              />
            </div>

            <div className="text-center">
              <h2 className="section-title">LINE CARD</h2>
              <p className="section-subtitle"></p>
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
        <div className="man-container">
          <div className="manufacturer-category">
            <p> </p>
            <h2 className="section-title">Manufacturers</h2>
            <p> </p>
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

      {/* Modal Section - Updated with carousel */}
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
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80vh",
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              Products for {selectedManufacturer?.toUpperCase()}
            </h2>

            {Array.isArray(modalContent) && modalContent.length > 0 ? (
              <div style={{ position: "relative" }}>
                {/* Carousel container */}
                <div style={{ position: "relative", width: "100%", height: "250px", overflow: "hidden" }}>
                  {/* Left arrow */}
                  {modalContent.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentSlide((prev) => (prev === 0 ? modalContent.length - 1 : prev - 1))
                      }}
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
                    {modalContent.map((product, index) => (
                      <div
                        key={index}
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
                        <div style={{ width: "100%", height: "150px", marginBottom: "15px", position: "relative" }}>
                          <Image
                            src={product.image || "/placeholder.svg?height=150&width=200"}
                            alt={product.name}
                            fill
                            style={{ objectFit: "contain" }}
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
                          onClick={(e) => {
                            // Store the current state in sessionStorage before navigating away
                            sessionStorage.setItem("scrollPosition", scrollYPosition.toString())
                            sessionStorage.setItem("selectedManufacturer", selectedManufacturer || "")
                          }}
                        >
                          {product.name}
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Right arrow */}
                  {modalContent.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentSlide((prev) => (prev === modalContent.length - 1 ? 0 : prev + 1))
                      }}
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
                {modalContent.length > 1 && (
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
                    {modalContent.map((_, index) => (
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

