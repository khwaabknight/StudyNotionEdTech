import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../../services/operations/profileAPI';
import Loader from '../../../Common/Loader';
import ProgressBar from '@ramonak/react-progress-bar';
import {BsThreeDotsVertical} from 'react-icons/bs'



// import FoundingStoryImg from '../../../../assets/Images/FoundingStory.png'
// const enrolledCourses = [
//   {
//     thumbnail:FoundingStoryImg,
//     courseName:'Cloud Computing',
//     courseDescription:'Full Practice Exam included + explanations | Learn Cloud Computing | Pass the AWS Cloud Practitioner CLF-C01 exam!',
//     totalDuration:'20hr 10mins',
//     progressPercentage: 65,    
//   },
//   {
//     thumbnail:FoundingStoryImg,
//     courseName:'Devops',
//     courseDescription:'Short Description',
//     totalDuration:'20hr 10mins',
//     progressPercentage: 100,    
//   }
// ]

const EnrolledCourses = () => {

  const {token} = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async() => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);

    } catch (error) {
      console.log("Unable to fetch enrolled courses data", error)
    }
  }

  useEffect(()=> {
    getEnrolledCourses();
  },[])

  return (
    <div>
      <div className='p-6'>
        {/* Breadcrumbs here */}
        <h2 className='font-medium text-3xl text-richblack-5'>Enrolled Courses</h2>
      </div>

      {
        !enrolledCourses ? (<Loader>Loading ...</Loader>) : (
          !enrolledCourses.length ? (<p>You have not enrolled in any course yet</p>) :(
            <div className='flex flex-col w-full p-6'>
              <div className='rounded-lg overflow-hidden border border-richblack-800'>
                {/* Table header */}
                <div className='grid grid-cols-6 w-full bg-richblack-700 text-richblack-50 p-4 gap-x-8 text-start'>
                  <p className='col-span-3'>Course Name</p>
                  <p className='col-span-1'>Duration</p>
                  <p className='col-span-2'>Progress</p>
                </div>

                {/* Table data --- Cards */}
                {
                  enrolledCourses.map((course,index) => (
                    <div key={index} className='grid grid-cols-12 p-4 border-t border-t-richblack-800'>
                      <div className='flex col-span-6 gap-x-5 items-center'>
                        <img src={course.thumbnail} alt='' className='w-14 aspect-square rounded'/>
                        <div className='flex flex-col'>
                          <p className='text-base font-medium text-richblack-5'>{course.courseName}</p>
                          <p className='text-base font-normal text-richblack-300'>{course.courseDescription.length > 60 ? (`${course.courseDescription.substring(0,50)} ... `) : (course.courseDescription)}</p>
                        </div>
                      </div>

                      <div className='flex items-center px-4 col-span-2 text-base font-medium text-richblack-50'>
                        {course?.totalDuration}
                      </div>

                      <div className='col-span-3 flex flex-col items-start px-5 justify-center gap-y-2'>
                        <p className='text-xs font-semibold text-richblack-50'>Progress: {course.progressPercentage || 0}%</p>
                        <ProgressBar completed={ course.progressPercentage || 0}
                        height='8px'
                        isLabelVisible={false}
                        className='w-[70%]'
                        />
                      </div>

                      <div className='col-span-1 flex justify-end items-center pr-6'>
                        <BsThreeDotsVertical/>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        )
      }


    </div>
  )
}

export default EnrolledCourses
