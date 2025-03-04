import Link from "next/link"
import Image from "next/image"


export default function About() {
  return (
    <main>
      {/* About Section Preview */}
      <section id="about" className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">About K&P Sales</h2>
              <p>
              K & P Sales Engineers has been a trusted partner for Intermountain West customers for nearly a century, delivering expert solutions across a wide range of industries. Specializing in the handling of bulk materials, we cater to the food, nutraceuticals, pharmaceuticals, chemicals, and mining sectors. From sizing and separation to conveying, weighing, dust collection, and dust suppression, we offer tailored solutions to meet your unique needs. Get in touch with us today to discuss how we can optimize your application.
              </p>

              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-number">40+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Projects Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">20+</div>
                  <div className="stat-label">Manufacturers</div>
                </div>
                <Link href="contact" className="btn btn-primary btn-lg" style={{ marginTop: "2rem", alignContent: "center"}}>
                Contact Us
              </Link>
              </div>
              
            </div>
            <div className="about-image">
              <Image
                src="/stock/lab.jpeg"
                alt="Industrial Equipment"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

