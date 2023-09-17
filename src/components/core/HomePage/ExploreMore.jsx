import React, { useState } from 'react'
import {HomePageExplore} from '../../../data/homepage-explore';
import HighLightText from './HighLightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }


  return (
    // 
    <div className='flex flex-col gap-2 justify-center items-center relative'>
      <div className='text-4xl font-semibold text-center'>
        Unlock the <HighLightText text={'Power of code'} />
      </div>

      <p className='text-center text-richblack-300 text-sm'>Learn to Build Anything You Can Imagine</p>

      <div className='flex flex-row my-5 rounded-full bg-richblack-800 p-1'>
        {
            tabsName.map( (element,index) => {
                return (
                    <div className={` text-base flex flex-row items-center gap-2 ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-6 py-2`} key={index} 
                    onClick={() => setMyCards(element)} >
                        {element}
                    </div>
                )
            })
        }
      </div>

      <div className='lg:h-[300px]'></div>

      {/* course card group */}
      <div className='absolute flex flex-row gap-10 justify-between w-full pt-20 top-40'>
        {
          courses.map((element,index) => {
            return (
              <CourseCard key={index} cardData = {element} currentCard = {currentCard} setCurrentCard={setCurrentCard} />

            )
          })
        }
      </div>

    </div>
  )
}

export default ExploreMore
