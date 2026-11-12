import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Footer } from '../components/Footer'

export function TextPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <div className="min-h-[80svh] px-5 pb-28 pt-32 md:px-[2.4vw] md:pt-[20vh]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="wordmark text-[clamp(48px,9vw,160px)] uppercase leading-[0.9]"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.25 } }}
          className="mt-14 max-w-2xl space-y-6 text-[15px] leading-relaxed md:ml-[38vw]"
        >
          {children}
        </motion.div>
      </div>
      <Footer />
    </>
  )
}

export function Placeholder({ children }: { children: ReactNode }) {
  return <p className="border-l-2 border-lilac pl-4 text-sm italic text-ink/70">{children}</p>
}
