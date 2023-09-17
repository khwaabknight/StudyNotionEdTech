import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <div className='w-11/12'>
      <div className='p-6'>
        {/* Breadcrumbs here */}
        <h2 className='font-medium text-3xl text-richblack-5'>Add Course</h2>
      </div>

      <div className='p-6 flex gap-x-6'>
        <div className='w-2/3'>
            <div className=''>
                <RenderSteps />
            </div>
        </div>

        <div className='flex flex-col gap-y-5 p-6 w-1/3 h-fit bg-richblack-800 border border-richblack-700 rounded-lg'>
            <p className='text-xl font-semibold text-richblack-5'>⚡ Course Upload Tips</p>
            <ul className='flex flex-col gap-y-3 list-disc pl-6'>
                <li className='text-sm text-richblack-5 font-medium'>Set the Course Price option or make it free.</li>
                <li className='text-sm text-richblack-5 font-medium'>Standard size for the course thumbnail is 1024x576.</li>
                <li className='text-sm text-richblack-5 font-medium'>Video section controls the course overview video.</li>
                <li className='text-sm text-richblack-5 font-medium'>Course Builder is where you create & organize a course.</li>
                <li className='text-sm text-richblack-5 font-medium'>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li className='text-sm text-richblack-5 font-medium'>Information from the Additional Data section shows up on the course single page.</li>
                <li className='text-sm text-richblack-5 font-medium'>Make Announcements to notify any important</li>
                <li className='text-sm text-richblack-5 font-medium'>Notes to all enrolled students at once.</li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default AddCourse
