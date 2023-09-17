import React from 'react'

const SubmitButton = ({children}) => {
  return (
    <button type='submit' className='bg-yellow-50 rounded-lg text-lg font-semibold text-richblack-900 px-5 py-2'>
        {children}
    </button>
  )
}

export default SubmitButton
