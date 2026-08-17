import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'

interface TiltedCardProps {
  imageSrc: string
  altText: string
  captionText?: string
  containerHeight: string
  containerWidth: string
  imageHeight: string
  imageWidth: string
  rotateAmplitude?: number
  scaleOnHover?: number
  showMobileWarning?: boolean
  showTooltip?: boolean
  displayOverlayContent?: boolean
  overlayContent?: ReactNode
}

export default function TiltedCard({
  imageSrc, altText, containerHeight, containerWidth, imageHeight, imageWidth,
  rotateAmplitude = 12, scaleOnHover = 1.2,
}: TiltedCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-.5, .5], [rotateAmplitude, -rotateAmplitude]), { stiffness: 220, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-.5, .5], [-rotateAmplitude, rotateAmplitude]), { stiffness: 220, damping: 20 })

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - bounds.left) / bounds.width - .5)
    y.set((event.clientY - bounds.top) / bounds.height - .5)
  }
  const reset = () => { x.set(0); y.set(0) }

  return <div className="tilted-card" style={{ width: containerWidth, height: containerHeight, perspective: '1000px' }} onPointerMove={handleMove} onPointerLeave={reset}>
    <motion.div className="tilted-card-inner" style={{ rotateX, rotateY }} whileHover={{ scale: scaleOnHover }} transition={{ type: 'spring', stiffness: 220, damping: 20 }}>
      <img src={imageSrc} alt={altText} style={{ width: imageWidth, height: imageHeight }} draggable={false} />
    </motion.div>
  </div>
}
