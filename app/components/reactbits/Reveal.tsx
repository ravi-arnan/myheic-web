'use client'

import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  distance?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  once?: boolean
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  distance = 24,
  direction = 'up',
  className,
  once = true
}: RevealProps): React.JSX.Element {
  const offset = direction === 'none' ? 0 : distance
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y'
  const sign = direction === 'down' || direction === 'right' ? 1 : -1

  const variants: Variants = {
    hidden: { opacity: 0, [axis]: axis === 'y' ? -sign * offset : sign * offset },
    visible: { opacity: 1, x: 0, y: 0 }
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10% 0px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
