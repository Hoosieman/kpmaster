"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Phone, Mail } from "lucide-react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector(".nav")
      if (nav && !nav.contains(event.target as Node) && menuOpen) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [menuOpen])

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname]) // Add pathname as a dependency

  return (
    <header className="header">
      <div className="container">
        {/* Left side with logo and contact info */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "nowrap" }}>
          <Link href="/" className="logo" style={{ flexShrink: 0 }}>
            <Image src="/images/kpmain.png" alt="K&P Sales Engineers Logo" width={50} height={50} />
          </Link>

          {/* Contact info - hidden on mobile, visible on md and up */}
          <div
            className="hidden md:block"
            style={{
              marginLeft: "1rem",
              display: "none", // Hidden by default
              whiteSpace: "nowrap",
            }}
          >
            <a
              href="tel:+1234567890"
              style={{
                display: "inline-flex",
                alignItems: "center",
                marginRight: "1rem",
                transition: "color 0.2s ease",
                fontSize: "0.875rem",
              }}
              className="hover:text-primary"
            >
              <Phone
                className="h-3 w-3 mr-2"
                style={{ display: "inline-block", verticalAlign: "middle", color: "white", marginRight: "0.5rem" }}
              />
              <span className="nav-link" style={{ display: "inline-block", verticalAlign: "middle", color: "white" }}>
                (801) 571-8322
              </span>
            </a>
            <a
              href="mailto:sales@kpsalesengineers.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                transition: "color 0.2s ease",
                fontSize: "0.875rem",
              }}
              className="hover:text-primary"
            >
              <Mail
                className="h-3 w-3 mr-2"
                style={{ display: "inline-block", verticalAlign: "middle", color: "white", marginRight: "0.5rem" }}
              />
              <span className="nav-link" style={{ display: "inline-block", verticalAlign: "middle", color: "white" }}>
                sales@kpsalesengineers.com
              </span>
            </a>
          </div>
        </div>

        <nav className="nav">
          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-list ${menuOpen ? "active" : ""}`}>
            {/* Menu items */}
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
                onClick={() => setMenuOpen(false)} // Close the menu on route click
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/about"
                className={`nav-link ${pathname === "/about" ? "active" : ""}`}
                onClick={() => setMenuOpen(false)} // Close the menu on route click
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/linecard"
                className={`nav-link ${pathname === "/linecard" ? "active" : ""}`}
                onClick={() => setMenuOpen(false)} // Close the menu on route click
              >
                Line Card
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/contact"
                className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
                onClick={() => setMenuOpen(false)} // Close the menu on route click
              >
                Contact
              </Link>
            </li>
            <li className="nav-cta">
              <Link
                href="/contact"
                className="btn btn-primary"
                onClick={() => setMenuOpen(false)} // Close the menu on route click
              >
                Get a Quote
              </Link>
            </li>

            {/* Mobile contact info - Fixed to display each item on its own line with clear spacing */}
            {menuOpen && (
              <div className="md:hidden px-4 py-2 border-t mt-2 flex flex-col">
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 py-2 hover:text-primary transition-colors w-full"
                  style={{ color: "white", display: "flex", marginTop: "4rem", marginBottom: "2rem", justifyContent: "center" }}
                >
                  
                  <span>(801) 571-8322</span>
                </a>
                <div className="w-full border-t border-gray-700 my-2"></div>
                <a
                  href="mailto:sales@kpsalesengineers.com"
                  className="flex items-center gap-2 py-2 hover:text-primary transition-colors w-full"
                  style={{ color: "white", display: "flex", justifyContent: "center" }}
                >
                
                  <span>sales@kpsalesengineers.com</span>
                </a>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

