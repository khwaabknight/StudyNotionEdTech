import React from 'react'
import levelLogo from '../../../assets/CourseCardLogo/levelLogo.svg'
import graphLogo from '../../../assets/CourseCardLogo/graphLogo.svg'
import levelLogoPassive from '../../../assets/CourseCardLogo/levelLogoPassive.svg'
import graphLogoPassive from '../../../assets/CourseCardLogo/graphLogoPassive.svg'

const CourseCard = ({key,cardData,currentCard,setCurrentCard}) => {
  return (
    <div key={key} onClick={() => setCurrentCard(cardData.heading)} className={`flex flex-col font-inter w-[30%] cursor-pointer ${cardData.heading === currentCard ? "bg-white text-richblack-500 shadow-[15px_15px_0_0] shadow-yellow-50" : " bg-richblack-800 text-richblack-400"}`}>
      <div className={`mt-8 mb-2 px-8 text-2xl font-semibold ${cardData.heading === currentCard ? "text-richblack-800" : "text-richblack-25"}`}>{cardData.heading}</div>
      <div className='mb-24 px-8 text-lg leading-6 font-normal'>{cardData.description}</div>
      <div className={`px-6 flex flex-row py-6 justify-between border-t border-dashed `}>
        <div className='flex flex-row items-center gap-2'>
          <img src={cardData.heading === currentCard ? levelLogo : levelLogoPassive} alt=''/>
          <p className={`text-base font-medium text-center ${cardData.heading === currentCard ? " text-blue-500" : "text-richblack-300"}`}>{cardData.level}</p>
        </div>
        <div className='flex flex-row items-center gap-2'>
          <img src={cardData.heading === currentCard ? graphLogo : graphLogoPassive} alt=''/>
          <p className={`text-base font-medium text-center ${cardData.heading === currentCard ? " text-blue-500" : "text-richblack-300"}`}>{cardData.lessionNumber} Lessons</p>
        </div>
      </div>
      
    </div>
  )
}

export default CourseCard
