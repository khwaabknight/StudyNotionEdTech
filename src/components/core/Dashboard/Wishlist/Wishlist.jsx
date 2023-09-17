import React from 'react'
import { useSelector } from 'react-redux'
import RenderTotalAmount from './RenderTotalAmount';
import RenderCartCourses from './RenderCartCourses';

const Wishlist = () => {

  // const {total,totalItems} = useSelector((state)=> state.cart);
  const totalItems = 2
  const total = 1000

  return (
    <div className='w-full'>
      <div className='p-6 pb-2'>
        {/* Breadcrumbs here */}
        <h2 className='font-medium text-3xl text-richblack-5'>Your Wishlist</h2>
        <p className='font-medium text-lg text-richblack-400 mt-10'>{totalItems} Courses in Cart</p>
      
      </div>

      <div className='h-[1px] bg-richblack-700 ml-6'/>

        {
          total > 0 ? (
            <div className='flex'>
              <RenderCartCourses />
              <RenderTotalAmount />
            </div>
          ) : (<p>Your Cart is Empty</p>)
        }
    </div>
  )
}

export default Wishlist
