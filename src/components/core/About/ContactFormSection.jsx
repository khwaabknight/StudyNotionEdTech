import React from 'react'
import ContactForm from './ContactForm'

const ContactFormSection = () => {
  return (
    <div className='w-2/5'>
      <h3 className='font-semibold text-4xl text-richblack-5 text-center pb-3'>Get in Touch</h3>
      <p className='text-center font-medium text-base text-richblack-300 mb-6'>We’d love to here for you, Please fill out this form.</p>
      <div><ContactForm/></div>
    </div>
  )
}

export default ContactFormSection
