import React from 'react'

const Loader = ({children}) => {
  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        <div className='mx-auto mb-20 spinner'/>
        <p className=' text-richblack-200 font-medium text-lg'>{children}</p>
      </div>
    </div>
  )
}

export default Loader
