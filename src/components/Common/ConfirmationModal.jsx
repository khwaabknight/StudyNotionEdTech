import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='absolute top-0 left-0 text-white bg-[#ffffff4f] backdrop-blur-sm w-screen h-[calc(100dvh_-_3.5rem)] flex items-center justify-center'>
        <div className='flex flex-col bg-richblack-800 opacity-100 p-6 gap-y-3 rounded-lg border border-richblack-200'>
            <p className='font-bold text-3xl text-richblack-5'>{modalData.text1}</p>
            <p className='text-richblack-200 text-base font-light'>{modalData.text2}</p>
            <div className='grid grid-cols-2 gap-x-4'>
                <IconBtn 
                    onclick={modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                    customClasses='bg-yellow-50 rounded-md text-base font-semibold text-richblack-900 px-7 py-2'
                />
                <IconBtn
                onclick={modalData?.btn2Handler}
                text={modalData?.btn2Text}
                customClasses='bg-richblack-200 rounded-md text-base font-semibold text-richblack-900 px-7 py-2'
                />
            </div>
        </div>
      
    </div>
  )
}

export default ConfirmationModal
