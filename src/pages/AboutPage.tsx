import { TextPage, Placeholder } from './TextPage'
import { Tagline } from '../components/Tagline'

export default function AboutPage() {
  return (
    <TextPage title="About">
      <Tagline className="text-2xl md:text-3xl" />
      <Placeholder>About copy to be supplied by Sam — studio story, practice and collaborators.</Placeholder>
    </TextPage>
  )
}
