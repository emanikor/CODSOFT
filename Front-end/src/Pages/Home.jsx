import React from 'react'
import Hero from '../Components/Hero/Hero'
import Jobs from '../Components/jobs/Jobs'
import Footer from '../Components/Footer/Footer'
import EmailBanner from '../Components/EmailBanner/Email'

const Home=()=> {
  return (
    <>
      <Hero/>
    <Jobs/>
    <EmailBanner/>
    <Footer/>
    </>
  )
}

export default Home