import { useEffect, useRef, type RefObject } from 'react'
import { ArrowRight, Check, X } from 'lucide-react'

interface CaseStudyDialogProps {
  open: boolean
  onClose: () => void
  returnFocusRef: RefObject<HTMLButtonElement | null>
}

const phases = [
  ['01', 'Discover', 'Shopping, rentals, wishlists and voice-led product discovery in one clear journey.'],
  ['02', 'Build', 'React state flows through Redux Toolkit to a Node and Express REST API.'],
  ['03', 'Deliver', 'MongoDB-backed catalog, orders, reviews, tracking and admin workflows.'],
]

const keyFeatures = [
  'JWT authentication', 'Product & rental CRUD', 'Cart & checkout', 'Order tracking',
  'Rental security deposit', 'Admin dashboard', 'Review sentiment analysis', 'Tag-cloud visualization',
  'Voice search', 'Wishlist', 'Product variants', 'Notifications',
]

export default function CaseStudyDialog({ open, onClose, returnFocusRef }: CaseStudyDialogProps) {
  const closeButton = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    closeButton.current?.focus()
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
      returnFocusRef.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section ref={dialogRef} className="case-dialog" role="dialog" aria-modal="true" aria-labelledby="case-study-title">
        <div className="dialog-header"><div><p className="eyebrow"><span />FEATURED CASE STUDY</p><h2 id="case-study-title">ShopiKart, examined.</h2></div><button ref={closeButton} className="dialog-close" onClick={onClose} type="button" aria-label="Close case study"><X size={20} /></button></div>
        <div className="case-dialog-grid">
          <div><p className="dialog-lede">A full-stack commerce and rental experience designed around the details that make product discovery, purchase, and management feel considered.</p><div className="tech-row" style={{ marginTop: 22 }}>{keyFeatures.map((feature) => <span key={feature}>{feature}</span>)}</div><div className="architecture"><span>User</span><ArrowRight size={15} /><span>React</span><ArrowRight size={15} /><span>Redux Toolkit</span><ArrowRight size={15} /><span>REST API</span><ArrowRight size={15} /><span>Express / Node</span><ArrowRight size={15} /><span>MongoDB</span></div></div>
          <div className="phase-list">{phases.map(([number, title, description]) => <article key={number} className="phase"><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><Check size={16} /></article>)}</div>
        </div>
        <button className="dialog-done button-secondary" onClick={onClose} type="button">Back to portfolio</button>
      </section>
    </div>
  )
}
