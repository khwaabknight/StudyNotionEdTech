import React from 'react'
import {HiChatBubbleLeftRight} from 'react-icons/hi2'
import {BsGlobeEuropeAfrica} from 'react-icons/bs'
import {FaPhoneAlt} from 'react-icons/fa'


const ContactUsLeft = () => {
  return (
    <div className='flex flex-col gap-6 p-6 text-white bg-richblack-800 w-1/3 h-fit rounded-xl'>
      <div className='flex gap-2.5 p-3'>
        <div><HiChatBubbleLeftRight className='translate-y-1.5'/></div>
        <div className='flex flex-col'>
            <h6 className='font-semibold text-richblack-5 text-lg'>Chat on us</h6>
            <p className='font-medium text-sm text-richblack-200'>Our friendly team is here to help.</p>
            <p className='font-semibold text-sm text-richblack-200'>xyz@abc.com</p>
        </div>
      </div>
      <div className='flex gap-2.5 p-3'>
        <div><BsGlobeEuropeAfrica className='translate-y-1.5'/></div>
        <div className='flex flex-col'>
            <h6 className='font-semibold text-richblack-5 text-lg'>Visit us</h6>
            <p className='font-medium text-sm text-richblack-200'>Come and say hello at our office HQ.</p>
            <p className='font-semibold text-sm text-richblack-200'>84/9 Monstadt, Teyvat,Enies Lobby</p>
        </div>
      </div>
      <div className='flex gap-2.5 p-3'>
        <div><FaPhoneAlt className='translate-y-1.5'/></div>
        <div className='flex flex-col'>
            <h6 className='font-semibold text-richblack-5 text-lg'>Call us</h6>
            <p className='font-medium text-sm text-richblack-200'>Mon - Fri From 9am to 5pm</p>
            <p className='font-semibold text-sm text-richblack-200'>+123 456 7890</p>
        </div>
      </div>
    </div>
  )
}

export default ContactUsLeft
