import { useId, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export function Accordion({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className="border-t border-ink/20">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-sans text-lg font-light lowercase tracking-tight transition group-hover:translate-x-1">{title}</span>
        <span className={`relative h-4 w-4 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} aria-hidden="true">
          <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-ink" />
          <span className="absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-ink" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm leading-relaxed text-ink/85">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
