"use client"

import { motion } from "motion/react"

export const FadeIn = ({ children, delay = 0, direction = "up", distance = 20, duration = 0.5 }) => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {}
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
    >
      {children}
    </motion.div>
  )
}

export const Reveal = ({ children, delay = 0 }) => {
  return (
    <div className="relative overflow-hidden w-fit">
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.8, 
          delay: delay,
          ease: [0.16, 1, 0.3, 1] 
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export const StaggerContainer = ({ children, delayChildren = 0, staggerBy = 0.1 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: staggerBy,
            delayChildren: delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
