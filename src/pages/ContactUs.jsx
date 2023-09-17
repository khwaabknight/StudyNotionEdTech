import React from 'react'
import ContactUsLeft from '../components/core/ContactUs/ContactUsLeft'
import ContactUsRight from '../components/core/ContactUs/ContactUsRight'
import Footer from '../components/Common/Footer'

const ContactUs = () => {
  return (
    <div>
      <div className='flex gap-14 w-11/12 max-w-maxContent mx-auto my-24'>
        <ContactUsLeft/>
        <ContactUsRight/>
      </div>
      <Footer/>
    </div>
  )
}

export default ContactUs
