"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export default function Home() {
  // Logo animation starts immediately
  const [logoAnimationStarted] = useState(true)

  return (
    <main>
      {/* Hero Section */}
      <section className="hero hero-loaded">
        <div className="container">
          <div className="hero-content">
            <div className="containers">
              <Image
                id="part1"
                className={`part animate-part1`}
                src="/logo/K1.png"
                alt="K"
                width={800}
                height={400}
                priority={true}
              />
              <Image
                id="part2"
                className={`part animate-part2`}
                src="/logo/K2.png"
                alt="K"
                width={800}
                height={400}
                priority={true}
              />
              <Image
                id="part3"
                className={`part animate-part3`}
                src="/logo/and2.png"
                alt="&"
                width={800}
                height={400}
                priority={true}
              />
              <Image
                id="part4"
                className={`part animate-part4`}
                src="/logo/PP1.png"
                alt="P"
                width={800}
                height={400}
                priority={true}
              />
              <Image
                id="part5"
                className={`part animate-part5`}
                src="/logo/PP2.png"
                alt="P"
                width={800}
                height={400}
                priority={true}
              />
              <Image
                id="part6"
                className={`part animate-part6`}
                src="/logo/text2.png"
                alt="Sales Engineers"
                width={800}
                height={400}
                priority={true}
              />
            </div>
            <div className={`hero-cta animate-cta`}>
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
                  src="/stock/growth.jpg"
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
                  src="/stock/tech.jpg"
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
                  src="/stock/chip.jpg"
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

