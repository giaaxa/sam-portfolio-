import { AnimatePresence, motion } from 'motion/react'
import { useLocation, useRoutes } from 'react-router-dom'
import { Header } from './components/Header'
import { NavigationOverlay } from './components/NavigationOverlay'
import { CartDrawer } from './components/CartDrawer'
import HomePage from './pages/HomePage'
import CharactersPage from './pages/CharactersPage'
import CharacterDetailPage from './pages/CharacterDetailPage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import TermsPage from './pages/TermsPage'
import NotFoundPage from './pages/NotFoundPage'

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/characters', element: <CharactersPage /> },
  { path: '/characters/:slug', element: <CharacterDetailPage /> },
  { path: '/shop', element: <ShopPage /> },
  { path: '/shop/:slug', element: <ProductPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/terms', element: <TermsPage /> },
  { path: '*', element: <NotFoundPage /> },
]

export default function App() {
  const location = useLocation()
  const element = useRoutes(routes, location)
  return (
    <>
      <a href="#main" className="sr-only z-[80] rounded bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <Header />
      <NavigationOverlay />
      <CartDrawer />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.45 } }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {element}
        </motion.main>
      </AnimatePresence>
    </>
  )
}
