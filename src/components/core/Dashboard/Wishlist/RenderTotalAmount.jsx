import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../Common/IconBtn'

const RenderTotalAmount = () => {
    const {total,cart} = useSelector((state) => state.cart);
    

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log("Bought these courses:", courses);
        // Todo:api integrate --> payment gateway redirect
    }
  return (
    <div className='flex flex-col gap-y-4 m-6 p-6 mr-0 rounded-md bg-richblack-800 border border-richblack-700 h-fit w-1/4'>
      <div className='flex flex-col gap-y-1'>
        <p className='font-semibold text-2xl text-richblack-200'>Total:</p>
        <p className='font-medium text-5xl text-yellow-50'>Rs. {total}</p>
        {/* <p className='font-normal text-lg text-richblack-300 line-through'>Rs. 3500</p> */}
      </div>
      <IconBtn
        text='Buy Now'
        onclick={handleBuyCourse}
        customClasses='bg-yellow-50 rounded-md text-lg font-semibold text-richblack-900 px-7 py-3 shadowins'
      />
    </div>
  )
}

export default RenderTotalAmount
