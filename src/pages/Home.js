import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import { Brain, Activity, Shield, BookOpen } from "lucide-react"
import Navbar from "../components/Navbar"
import "./Home.css"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      <main>
        <section id="home" className="hero-header pt-20">
          <div className="container relative">
            <Navbar />
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              NeuroAI
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              AI-driven early detection system for neurodegenerative diseases
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Link to="/login" className="contact-button animate-pulse">
                Login
              </Link>
            </motion.div>
          </div>
        </section>

        <section id="diseases" className="diseases">
          <div className="container">
            <h2>Understanding Neurodegenerative Diseases</h2>
            <p>
              Neurodegenerative diseases are conditions that progressively damage neurons in the brain and nervous
              system. Early detection is crucial for better management and potential treatment outcomes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="disease-card">
                <h3>Alzheimer's Disease</h3>
                <p>
                  Progressive brain disorder affecting memory, thinking, and behavior. Early signs include difficulty
                  remembering recent events or conversations.
                </p>
              </div>
              <div className="disease-card">
                <h3>Parkinson's Disease</h3>
                <p>
                  Affects motor function, causing tremors, stiffness, and balance problems. Early detection can lead to
                  better symptom management.
                </p>
              </div>
              <div className="disease-card">
                <h3>Huntington's Disease</h3>
                <p>
                  A genetic disorder leading to progressive motor dysfunction and cognitive decline. Early genetic
                  testing can help in preparation and family planning.
                </p>
              </div>
              <div className="disease-card">
                <h3>ALS</h3>
                <p>
                  Amyotrophic Lateral Sclerosis affects motor neurons leading to muscle weakness and atrophy. Early
                  diagnosis can help in managing symptoms effectively.
                </p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-4">Benefits of Early Detection</h3>
              <ul className="list-disc list-inside">
                <li>Improved treatment outcomes and quality of life</li>
                <li>Opportunity for early intervention and lifestyle changes</li>
                <li>Better planning for future care and support</li>
                <li>Increased time for clinical trial participation</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="container">
            <h2>Why Early Detection Matters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="about-card">
                <h3>Improved Patient Outcomes</h3>
                <p>
                  Early detection allows for timely interventions, potentially slowing disease progression and improving
                  overall quality of life for patients. By identifying neurodegenerative diseases in their early stages,
                  we can provide patients with the best chance for effective treatment and management.
                </p>
              </div>
              <div className="about-card">
                <h3>Personalized Treatment Plans</h3>
                <p>
                  Identifying neurodegenerative diseases early enables healthcare providers to develop tailored
                  treatment strategies for each patient. This personalized approach takes into account individual
                  factors, leading to more effective interventions and better long-term outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <div className="container">
            <h2>Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="feature-card">
                <Brain className="feature-icon" />
                <h3>AI-Powered Analysis</h3>
                <p>
                  Advanced algorithms analyze symptoms and biomarkers for accurate disease detection, providing insights
                  that may not be immediately apparent to human observers.
                </p>
              </div>
              <div className="feature-card">
                <Activity className="feature-icon" />
                <h3>Risk Assessments</h3>
                <p>
                  Personalized risk profiles based on genetic, lifestyle, and environmental factors, helping individuals
                  understand their unique risk landscape and take proactive measures.
                </p>
              </div>
              <div className="feature-card">
                <Shield className="feature-icon" />
                <h3>Secure Accounts</h3>
                <p>
                  State-of-the-art encryption and privacy measures to protect your sensitive health data, ensuring that
                  your information remains confidential and secure at all times.
                </p>
              </div>
              <div className="feature-card">
                <BookOpen className="feature-icon" />
                <h3>Educational Resources</h3>
                <p>
                  Comprehensive library of information on neurodegenerative diseases and prevention strategies,
                  empowering users with knowledge to make informed decisions about their health.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container">
            <h2>Get in Touch</h2>
            <p>
              Have questions or want to learn more? We're here to help you navigate the world of neurodegenerative
              disease detection and prevention.
            </p>
            <Link to="/contact" className="contact-button">
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2023 NeuroAI. All rights reserved.</p>
          <div className="mt-4">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

