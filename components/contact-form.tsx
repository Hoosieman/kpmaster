"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import emailjs from "emailjs-com"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    honeypot: "", // Honeypot field to catch bots
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState("")
  const recaptchaRef = useRef<HTMLDivElement>(null)

  // Load reCAPTCHA script
  useEffect(() => {
    // Load the reCAPTCHA script if it hasn't been loaded yet
    if (!window.grecaptcha) {
      const script = document.createElement("script")
      script.src = "https://www.google.com/recaptcha/api.js?render=6Le_L_0qAAAAAK3_XXftJUZr738-vwSV1SuCeqtl"
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    }
  }, [])

  // Execute reCAPTCHA when form is about to be submitted
  const executeRecaptcha = async () => {
    if (window.grecaptcha) {
      try {
        const token = await window.grecaptcha.execute("6Le_L_0qAAAAAK3_XXftJUZr738-vwSV1SuCeqtl", { action: "submit" })
        return token
      } catch (error) {
        console.error("reCAPTCHA error:", error)
        return null
      }
    }
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if honeypot field is filled (bots will fill this)
    if (formData.honeypot) {
      console.log("Bot submission detected via honeypot")
      // Pretend to submit but don't actually send
      setIsSubmitting(true)
      setTimeout(() => {
        setIsSubmitting(false)
        alert("Thank you for your message. We'll get back to you soon!")
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          honeypot: "",
        })
      }, 1500)
      return
    }

    setIsSubmitting(true)

    // Get reCAPTCHA token
    const token = await executeRecaptcha()
    if (!token) {
      setIsSubmitting(false)
      alert("Verification failed. Please try again later.")
      return
    }

    // Add the token to your form data or verify it server-side
    const formDataWithToken = {
      ...formData,
      recaptchaToken: token,
    }

    // Remove honeypot field before sending
    const { honeypot, ...dataToSend } = formDataWithToken

    emailjs.send("service_0xsfz0b", "template_ygsl5hr", dataToSend, "4C2eitDozX3gNkL5H").then(
      (result) => {
        console.log("Message sent successfully:", result.text)
        alert("Thank you for your message. We'll get back to you soon!")
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          honeypot: "",
        })
        setIsSubmitting(false)
      },
      (error) => {
        console.error("Error sending message:", error.text)
        alert("Something went wrong. Please try again later.")
        setIsSubmitting(false)
      },
    )
  }

  return (
    <div className="contact-form">
      <h2>Send Us a Message</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="form-control"
            required
            value={formData.subject}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="form-control"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
          ></textarea>
        </div>

        {/* Honeypot field - hidden from humans but bots will fill it */}
        <div className="form-group" style={{ display: "none" }}>
          <label htmlFor="honeypot" className="form-label">
            Leave this field empty
          </label>
          <input
            type="text"
            id="honeypot"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Invisible reCAPTCHA container */}
        <div ref={recaptchaRef} className="g-recaptcha" data-size="invisible"></div>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  )
}

// Add this to your global.d.ts file or directly in this file
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

