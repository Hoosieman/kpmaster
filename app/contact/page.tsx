import Link from "next/link"
import ContactForm from "@/components/contact-form"

export default function Contact() {
  return (
    <main>
      {/* Page Header */}
      <section className="section-sm" style={{ backgroundColor: "var(--secondary)", color: "var(--light)" }}>
        <div className="container">
          <h1 className="section-title" style={{ color: "var(--light)" }}>
            Contact Us
          </h1>
          <p style={{ maxWidth: "800px" }}>
            Get in touch with our team of experts to discuss your industrial equipment needs and discover how we can
            help you achieve your goals.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-text">
                  <h3>Our Location</h3>
                  <p>
                    9448 S 1210 E
                    <br />
                    Sandy, UT 84094
                    <br />
                    United States
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-text">
                  <h3>Phone</h3>
                  <p>(801) 571-8322</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-text">
                  <h3>Email</h3>
                  <p>info@kpsalesengineers.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="contact-text">
                  <h3>Business Hours</h3>
                  <p>
                    Monday - Friday: 8:00 AM - 5:00 PM
                    <br />
                    Saturday & Sunday: Closed
                  </p>
                </div>
              </div>

              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.275494123532!2d-111.85640199999999!3d40.579674000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87527d56220cfc9d%3A0x9fc71ca6c30cd910!2sK%20%26%20P%20Sales%20Engineers%20Inc!5e0!3m2!1sen!2sus!4v1741098913128!5m2!1sen!2sus"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-sm cta">
        <div className="container">
          <h2 className="cta-title">Need immediate assistance?</h2>
          <p className="cta-text">
            Call us directly at (801) 571-8322 to speak with one of our industrial equipment specialists.
          </p>
          <Link
            href="tel:8015718322"
            className="btn btn-lg"
            style={{ backgroundColor: "white", color: "var(--primary)" }}
          >
            Call Now
          </Link>
        </div>
      </section>
    </main>
  )
}

