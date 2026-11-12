import { Link } from 'react-router-dom'
import { TextPage } from './TextPage'

export default function NotFoundPage() {
  return (
    <TextPage title="Missed">
      <p className="font-wide text-xl font-light">That page swung and missed.</p>
      <Link to="/" className="inline-block rounded-full border border-ink px-6 py-3 font-display text-xs font-extrabold uppercase hover:bg-ink hover:text-white">Back home</Link>
    </TextPage>
  )
}
