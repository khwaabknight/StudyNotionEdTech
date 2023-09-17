import React from 'react'
import ContactForm from '../About/ContactForm'

const ContactUsRight = () => {
  return (
    <div className='p-12 border border-richblack-600 rounded-xl'>
      <h3 className='font-semibold text-4xl text-richblack-5 pb-3'>Got a Idea? We’ve got the skills.<br/>Let’s team up</h3>
      <p className='font-medium text-base text-richblack-300 mb-6'>Tall us more about yourself and what you’re got in mind.</p>
      <div><ContactForm/></div>
    </div>
  )
}

export default ContactUsRight
