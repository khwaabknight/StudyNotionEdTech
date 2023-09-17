import React from 'react'
import HighLightText from './HighLightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './Button';

const LearningLanguageSection = () => {
  return (
    <div className='mt-10 mb-32'>

      <div className='flex flex-col gap-3 px-64 items-center'>
        
        <div className=' text-4xl font-semibold text-center'>
          Your swiss knife for <HighLightText text={"learning any language"} />
        </div>

        <div className='text-center text-richblack-600 mx-auto text-[18px] leading-7'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-row items-center justify-center mt-7'>
          <img src={know_your_progress} alt='KYPImage' className='object-contain -mr-36'/>
          <img src={compare_with_others} alt='CWOImage' className='object-contain'/>
          <img src={plan_your_lessons} alt='PYLImage' className='object-contain -ml-48'/>
        </div>

        <div className='w-fit'>
          <CTAButton active={true} linkto={"/signup"}>
            <div>Learn more</div>
          </CTAButton>
        </div>

      </div>
    </div>
  )
}

export default LearningLanguageSection
