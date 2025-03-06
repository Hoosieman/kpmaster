import Link from "next/link"
import Image from "next/image"
import { Facebook, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <Link href="/" className="footer-logo">
              <Image src="/images/kpmain.png" alt="K&P Sales Engineers Logo" width={50} height={50} />
            </Link>
            <p className="footer-text">
              K&P Sales Engineers provides innovative industrial solutions for mining, power generation, chemical
              processing, and more since 1978.
            </p>
            <div className="footer-social">
              <Link href="#" className="social-link">
                <Linkedin size={18} />
              </Link>
              <Link href="#" className="social-link">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="social-link">
                <Twitter size={18} />
              </Link>
            </div>
          </div>
          <div className="footer-links">
            <h3 className="footer-title">Quick Links</h3>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/linecard">Line Card</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3 className="footer-title">Contact Us</h3>
            <ul>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>8841 South Redwood Road, Suite A1 <br></br>West Jordan, UT 84088</span>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <span>(801) 571-8322</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>sales@kpsalesengineers.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} K&P Sales Engineers, Inc. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

