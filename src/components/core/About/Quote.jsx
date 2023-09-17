import React from 'react'
import GradientText from './GradientText'
import {BiSolidQuoteRight,BiSolidQuoteLeft} from 'react-icons/bi'

const Quote = () => {
  return (
    <div className='text-center text-richblack-100 text-4xl leading-[3rem] font-semibold w-11/12 max-w-maxContent mx-auto'>
      <BiSolidQuoteLeft size={21} className='inline -translate-y-6'/> We are passionate about revolutionizing the way we learn. Our innovative platform
      <GradientText text={"combines technology"} gradient={'from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb]'}/>, 
      <GradientText text={"expertise"} gradient={'from-[#FF512F] to-[#F09819]'}/>, 
      and community to create an 
      <GradientText text={"unparalleled educational experience."} gradient={'from-[#E65C00] to-[#F9D423]'}/>
      <BiSolidQuoteRight size={20} className='inline -translate-y-6'/>
    </div>
  )
}

export default Quote
