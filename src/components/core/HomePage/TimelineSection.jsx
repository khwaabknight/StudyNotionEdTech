import React from 'react';
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import timelineImage from '../../../assets/Images/TimelineImage.png';

const timeline = [
  {
    Logo:Logo1,
    Heading: "Leadership",
    Description:"Fully committed to the success company"
  },
  {
    Logo:Logo2,
    Heading: "Responsibility",
    Description:"Students will always be our top priority"
  },
  {
    Logo:Logo3,
    Heading: "Flexibility",
    Description:"The ability to switch is an important skills"
  },
  {
    Logo:Logo4,
    Heading: "Solve the problem",
    Description:"Code your way to a solution"
  },
]

const TimelineSection = () => {
  return (
    <div>
      <div className='flex flex-row gap-32 items-center my-12 w-full -translate-x-10'>
        <div className='flex flex-col gap-10 relative'>
          {
            timeline.map((element,index) => {
              return(
                <div className='flex flex-row items-center gap-6' key={index} >
                  {/* Logo */}
                  <div className='w-[40px] h-[40px] bg-white flex items-center justify-center rounded-full'>
                    <img src={element.Logo} alt='' />
                  </div>
                  {/* Desc */}
                  <div>
                    <h2 className=' font-semibold text-[18px]'>{element.Heading}</h2>
                    <p className='text-base'>{element.Description}</p>
                  </div>
                </div>
              )
            })
          }
          <div className='w-[1px] h-9 border-l border-dashed border-richblack-100 absolute left-[20px] top-[52px]'></div>
          <div className='w-[1px] h-9 border-l border-dashed border-richblack-100 absolute left-[20px] top-[145px]'></div>
          <div className='w-[1px] h-9 border-l border-dashed border-richblack-100 absolute left-[20px] top-[234px]'></div>
        </div>

        <div className='relative '>

          <img src={timelineImage} alt='timelineImage' className='shadow-2xl shadow-blue-50 object-cover h-fit' />
          
          {/* green box */}
          <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]'>

            <div className='flex flex-row gap-5 items-center border-r border-r-caribbeangreen-500 px-7'>
              <p className=' text-3xl font-bold'>10</p>
              <p className=' text-caribbeangreen-300 text-sm'>Years of Experience</p>
            </div>

            <div className='flex flex-row gap-5 items-center px-7'>
              <p className=' text-3xl font-bold'>250</p>
              <p className=' text-caribbeangreen-300 text-sm'>Types of Courses</p>
            </div>

          </div>
        </div>


      </div>
    </div>
  )
}

export default TimelineSection;
