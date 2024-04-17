import React from 'react'
import Hero from '../Components/Hero/Hero'
import Jobs from '../Components/jobs/Jobs'
import Footer from '../Components/Footer/Footer'
import EmailBanner from '../Components/EmailBanner/Email'
import Offer from '../Components/Offers/Offer'
import Ctegory from '../Components/Category/Ctegory'

const Home=()=> {
  return (
    <>
      <Hero/>
      {/* <Offer/> */}
      <Offer/>
      <Ctegory/>
    <Jobs/>
    <EmailBanner/>
    <Footer/>
    </>
  )
}

export default Home