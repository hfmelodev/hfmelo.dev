import { About } from '@/components/sections/about'
import { Capabilities } from '@/components/sections/capabilities'
import { Contact } from '@/components/sections/contact'
import { Experience } from '@/components/sections/experience'
import { Hero } from '@/components/sections/hero'
import { MoreProjects } from '@/components/sections/more-projects'
import { StackMarquee } from '@/components/sections/stack-marquee'
import { Work } from '@/components/sections/work'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <StackMarquee />
        <Work />
        <MoreProjects />
        <Capabilities />
        <About />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
