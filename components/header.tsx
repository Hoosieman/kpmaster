"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

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
  }, [])

  return (
    <header className="header">
      <div className="container">
        <Link href="/" className="logo">
          <Image src="/images/kpmain.png" alt="K&P Sales Engineers Logo" width={50} height={50} />
        </Link>
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
            <li className="nav-item">
              <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/#about" className={`nav-link ${pathname === "/#about" ? "active" : ""}`}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/linecard" className={`nav-link ${pathname === "/linecard" ? "active" : ""}`}>
                Line Card
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className={`nav-link ${pathname === "/contact" ? "active" : ""}`}>
                Contact
              </Link>
            </li>
            <li className="nav-cta">
              <Link href="/contact" className="btn btn-primary">
                Get a Quote
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

