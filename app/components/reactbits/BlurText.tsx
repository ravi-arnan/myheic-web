'use client'

import { motion } from 'motion/react'
import { useMemo } from 'react'

interface BlurTextProps {
  text: string
  delay?: number
  className?: string
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  duration?: number
  once?: boolean
}

export default function BlurText({
  text,
  delay = 60,
  className = '',
  animateBy = 'words',
  direction = 'top',
  duration = 0.55,
  once = true
}: BlurTextProps): React.JSX.Element {
  const segments = useMemo(
    () => (animateBy === 'words' ? text.split(' ') : text.split('')),
    [text, animateBy]
  )

  const ySign = direction === 'top' ? -1 : 1

  return (
    <span className={`inline-flex flex-wrap justify-center ${className}`}>
      {segments.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          initial={{ filter: 'blur(8px)', opacity: 0, y: ySign * 12 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once, margin: '0px' }}
          transition={{
            duration,
            delay: (index * delay) / 1000,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{
            display: 'inline-block',
            willChange: 'transform, filter, opacity',
            marginRight: animateBy === 'words' ? '0.28em' : undefined
          }}
        >
          {segment === ' ' ? ' ' : segment}
        </motion.span>
      ))}
    </span>
  )
}
