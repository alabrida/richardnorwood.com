'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackToTop() {
  const [showButton, setShowButton] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY
      const windowHeight = window.innerHeight
      const bodyHeight = document.body.offsetHeight
      const footerElement = document.querySelector('footer')
      const footerHeight = footerElement?.offsetHeight || 0
      const footerTop = bodyHeight - footerHeight
      
      // Show button if scrolled enough
      setShowButton(scrollPos > 400)
      
      // Hide button exactly 20 pixels before reaching the footer
      const threshold = footerTop - windowHeight - 20
      setIsVisible(scrollPos < threshold)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {(showButton && isVisible) && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ 
            position: 'fixed', 
            right: '2rem', 
            bottom: '2rem', 
            width: 50, height: 50, 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-dark))',
            border: 'none',
            color: 'var(--color-text-inverse)',
            cursor: 'pointer',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(240, 180, 41, 0.4)',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}
          aria-label="Back to top"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}
