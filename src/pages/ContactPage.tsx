import { TextPage, Placeholder } from './TextPage'
import { brand } from '../data/assets'

export default function ContactPage() {
  return (
    <TextPage title="Contact">
      <p className="font-wide text-xl font-light">
        Say hello on{' '}
        <a href={brand.instagramUrl} target="_blank" rel="noreferrer" className="underline decoration-ink/30 underline-offset-8 hover:decoration-ink">
          Instagram
        </a>
        .
      </p>
      <Placeholder>Contact email / commission enquiries to be supplied.</Placeholder>
    </TextPage>
  )
}
