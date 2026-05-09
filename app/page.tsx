import DesktopCta from './components/sections/DesktopCta'
import Faq from './components/sections/Faq'
import Features from './components/sections/Features'
import Footer from './components/sections/Footer'
import Header from './components/sections/Header'
import Hero from './components/sections/Hero'
import HowItWorks from './components/sections/HowItWorks'
import PhoneMarquee from './components/sections/PhoneMarquee'
import Stats from './components/sections/Stats'
import WhyThisExists from './components/sections/WhyThisExists'

export default function Home(): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--color-surface)]">
      <Header />
      <Hero />
      <Stats />
      <PhoneMarquee />
      <Features />
      <HowItWorks />
      <WhyThisExists />
      <DesktopCta />
      <Faq />
      <Footer />
    </div>
  )
}
