import React from 'react'
import Instructorimg from '../../../assets/Images/Instructor.png';
import HighLightText from './HighLightText';
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa';

const InstructorSection = () => {
  return (
    <div className='mt-16'>
      <div className='flex flex-row gap-20 items-center'>

        <div className='w-1/2' >
            <img src={Instructorimg} alt='Insructorimg' className='shadow-[-20px_-20px_0_0_#f5f5f5]'/>
        </div>

        <div className=' w-1/2 flex flex-col gap-10 items-start'>
            <div className='text-4xl font-semibold'>
                Become an <br/> <HighLightText text={'instructor'} />
            </div>
            <div className='text-base font-medium w-11/12 text-richblack-300'>
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
            </div>
            <CTAButton active={true} linkto={"/signup"}>
                <div className='flex flex-row gap-4 items-center'>Start Teaching Today <FaArrowRight/> </div>
            </CTAButton>
        </div>


      </div>
    </div>
  )
}

export default InstructorSection
