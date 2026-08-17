import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface CountUpProps { value: string }

export function CountUp({ value }: CountUpProps) {
  const target = Number.parseInt(value, 10)
  const suffix = value.replace(/^\d+/, '')
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: .7 })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => String(Math.round(latest)).padStart(value.startsWith('0') ? 2 : 1, '0'))

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, target, { duration: 1.35, ease: [0.16, 1, 0.3, 1] })
    return controls.stop
  }, [count, isInView, target])

  return <span ref={ref}><motion.span>{rounded}</motion.span>{suffix === '%' ? <span className="stat-suffix">%</span> : suffix}</span>
}
