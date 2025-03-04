import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export default function LineCard() {
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
              <div className="manufacturer-item">
                <div className="manufacturer-logo">
                  <Image
                    src="/images/aaf.png"
                    alt="AAF International"
                    width={200}
                    height={80}
                  />
                </div>
                <div className="manufacturer-info">
                  <p></p>
                  <Link href="#" className="manufacturer-link">
                    Products <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

              <div className="manufacturer-item">
                <div className="manufacturer-logo">
                  <Image src="/images/andco.jpg" alt="Andco" width={200} height={80} />
                </div>
                <div className="manufacturer-info">
                  <p></p>
                  <Link href="#" className="manufacturer-link">
                    Products <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

              <div className="manufacturer-item">
                <div className="manufacturer-logo">
                  <Image src="/images/bunting.jpg" alt="bunting" width={200} height={80} />
                </div>
                <div className="manufacturer-info">
                  <p></p>
                  <Link href="#" className="manufacturer-link">
                    Products <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

              <div className="manufacturer-item">
                <div className="manufacturer-logo">
                  <Image
                    src="/images/dsi.png"
                    alt="dsi"
                    width={200}
                    height={80}
                  />
                </div>
                <div className="manufacturer-info">
                  <p></p>
                  <Link href="#" className="manufacturer-link">
                    Products <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

              <div className="manufacturer-item">
                <div className="manufacturer-logo">
                  <Image src="/images/formpak.png" alt="formpak" width={200} height={80} />
                </div>
                <div className="manufacturer-info">
                  <p></p>
                  <Link href="#" className="manufacturer-link">
                    Products <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

              <div className="manufacturer-item">
                <div className="manufacturer-logo">
                  <Image src="/images/kinematics.png" alt="kinematics" width={200} height={80} />
                </div>
                <div className="manufacturer-info">
                  <p></p>
                  <Link href="#" className="manufacturer-link">
                    Products <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

              <div className="manufacturer-item">
                <div className="manufacturer-logo">
                  <Image src="/images/orthman.png" alt="orthman" width={200} height={80} />
                </div>
                <div className="manufacturer-info">
                  <p></p>
                  <Link href="#" className="manufacturer-link">
                    Products <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

              <div className="manufacturer-item">
                <div className="manufacturer-logo">
                  <Image src="/images/prater.png" alt="prater" width={200} height={80} />
                </div>
                <div className="manufacturer-info">
                  <p></p>
                  <Link href="#" className="manufacturer-link">
                    Products <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

              <div className="manufacturer-item">
                <div className="manufacturer-logo">
                  <Image src="/images/sweco.png" alt="sweco" width={200} height={80} />
                </div>
                <div className="manufacturer-info">
                  <p></p>
                  <Link href="#" className="manufacturer-link">
                    Products <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>


              <div className="manufacturer-item">
                <div className="manufacturer-logo">
                  <Image src="/images/thermo.png" alt="thermo" width={200} height={80} />
                </div>
                <div className="manufacturer-info">
                  <p></p>
                  <Link href="#" className="manufacturer-link">
                    Products <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
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
    </main>
  )
}

