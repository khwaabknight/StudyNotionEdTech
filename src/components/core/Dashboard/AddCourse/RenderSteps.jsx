import React from 'react'
import { useSelector } from 'react-redux'
import {FaCheck} from 'react-icons/fa'
import CourseInformationForm from './CourseInformation/CourseInformationForm'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import CoursePublishForm from './CoursePublish/CoursePublishForm'

const RenderSteps = () => {

    const {step} = useSelector((state) => state.course)

    const steps = [
      {
        id:1,
        title:"Course Information",
      },
      {
        id:2,
        title:"Course Builder",
      },
      {
        id:3,
        title:"Publish",
      }
    ]

  return (
    <div>
      <div className='flex mb-7'>
        {
          steps.map( (item) => (
            <div key={item.id} className='flex flex-col justify-center items-center gap-y-2 w-full'>
              <div className='flex justify-center items-center w-full'>
                <div className={`h-[1px] w-full border-dashed ${item.id !== 1 && ( step < item.id ? "border border-richblack-600" : "border border-yellow-50")}`}/>
                <div className={`w-20 aspect-square rounded-full flex items-center justify-center border ${step === item.id ? "bg-yellow-900 border-yellow-50 text-yellow-50" : ( step < item.id ? "border-richblack-700 bg-richblack-800 text-richblack-300" : "bg-yellow-50 border-yellow-100 text-richblack-900")}`}>
                {
                  step > item.id ? (<FaCheck/>) : (item.id)
                }
                </div>
                <div className={`h-[1px] w-full border-dashed ${item.id !== steps.length && ( step <= item.id ? "border border-richblack-600" : "border border-yellow-50")}`}/>
              </div>
              <p className={`text-sm font-normal ${step === item.id ? "text-richblack-5" : "text-richblack-500"}`}>{item.title}</p>
            </div>
          ))
        }
      </div>

      {step === 1 && <CourseInformationForm/>}
      {step === 2 && <CourseBuilderForm/>}
      {step === 3 && <CoursePublishForm/>}
    </div>
  )
}

export default RenderSteps
