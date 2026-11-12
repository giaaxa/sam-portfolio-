import { TextPage, Placeholder } from './TextPage'

const sections = ['Terms of sale', 'Privacy policy', 'Shipping', 'Returns & refunds']

export default function TermsPage() {
  return (
    <TextPage title="Terms & Policies">
      <Placeholder>Placeholder legal pages — final wording must be supplied and reviewed before launch.</Placeholder>
      {sections.map((s) => (
        <section key={s} id={s.toLowerCase().replace(/[^a-z]+/g, '-')}>
          <h2 className="font-display text-sm font-extrabold uppercase tracking-wide">{s}</h2>
          <p className="mt-2 text-ink/70">To be supplied.</p>
        </section>
      ))}
    </TextPage>
  )
}
