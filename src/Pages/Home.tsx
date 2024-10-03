import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Menu from '../components/Menu'
import Contact from '../components/Contact'
import Testimonials from '../components/Testimonial'
import Team from '../components/Team'
import CallToAction from '../components/CallToAction'
import Features from '../components/Features'
import Newsletter from '../components/Newsletter'

function Home() {
  return (
    <>
        <Hero />
        <About />
        <Menu />
        <Features />
        <Contact />
        <Testimonials />
        <CallToAction />
        <Team />
        <Newsletter />
    </>
  )
}

export default Home