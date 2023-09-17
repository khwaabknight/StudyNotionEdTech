import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI"

import CourseTable from "./CourseTable"
import IconBtn from "../../../Common/IconBtn"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CourseTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}


// import React from 'react'
// import {HiPencil} from 'react-icons/hi2'
// import {MdOutlineDeleteForever} from 'react-icons/md'
// import {BsCheckCircleFill,BsClockFill} from 'react-icons/bs'
// import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
// import { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useEffect } from 'react'
// import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice'
// import { useNavigate } from 'react-router-dom'


// const MyCourses = () => {

//     const {token} = useSelector((state) => state.auth)
//     const [myCourses, setMyCourses] = useState([]);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const fetchMyCourses = async() => {
//       const result = await fetchInstructorCourses(token)
//       setMyCourses(result);
//     }

//     const editCourseHandler = (course) => {
//         dispatch(setStep(1));
//         dispatch(setCourse(course));
//         dispatch(setEditCourse(true));
//         navigate('/dashboard/add-course')
//     }
//     const deleteCourseHandler = async (course) => {
//         const result = await deleteCourse({courseId:course._id},token)
//         fetchMyCourses();
//     }

//     useEffect(() => {
//       fetchMyCourses();
//       // eslint-disable-next-line 
//     },[])

//   return (
//     <div>
//       <div className='p-6'>
//         {/* Breadcrumbs here */}
//         <h2 className='font-medium text-3xl text-richblack-5'>My Courses</h2>
//         <IconBtn 
//             text='Add Course'
//             onclick = {() => navigate("/dashboard/add-course")}
//             // add icon here
//         />
//       </div>{
//       myCourses?.length > 0 ? 
//       <div className='ml-6 rounded-md w-[98%] border border-richblack-800'>
//         <div className='grid grid-cols-9 p-4 font-medium text-sm text-richblack-100 uppercase border-b border-b-richblack-800'>
//             <p className='col-span-6'>Courses</p>
//             <p className='col-span-1 text-center'>Duration</p>
//             <p className='col-span-1 text-center'>Price</p>
//             <p className='col-span-1 text-center'>Actions</p>
//         </div>
//         <div className='flex flex-col gap-y-5'>
//         {
//             myCourses.map((course,index) => (
//                 <div key={index} className='grid grid-cols-9'>
//                     {/* thumbnail */}
//                     <div  className='col-span-2 m-4'>
//                         <img src={course.thumbnail} alt='thumbnail' className='rounded-md'/>
//                     </div>
//                     {/* description */}
//                     <div className='col-span-4 p-4'>
//                         <h4 className='font-semibold text-xl text-richblack-5'>{course.courseName}:</h4>
//                         <p className='overflow-hidden font-normal text-base text-richblack-100 text-ellipsis h-12 mt-2'>{course.courseDescription}</p>
//                         <p className='mt-4 text-sm text-richblack-25 font-medium'>Created: {course.created}</p>
//                         {course.status === 'Published' ? (
//                             <div className='mt-4 px-3 py-1 gap-x-1.5 flex justify-center items-center rounded-full bg-richblack-700 w-fit'>
//                                 {/* Icon */}
//                                 <BsCheckCircleFill className='text-yellow-50'/>
//                                 <p className='text-yellow-100'>Published</p>
//                             </div>
//                         ) : (
//                             <div className='mt-4 px-3 py-1 gap-x-1.5 flex justify-center items-center rounded-full bg-richblack-700 w-fit'>
//                                 {/* Icon */}
//                                 <BsClockFill className='text-pink-50'/>
//                                 <p className='text-pink-100'>Drafted</p>
//                             </div>
//                         )}
//                     </div>

//                     {/* Duration */}
//                     <div className='col-span-1 p-4 pl-0 flex items-center justify-center text-richblack-100 font-medium text-base'>
//                         {course.totalDuration}
//                     </div>

//                     {/* Price */}
//                     <div className='col-span-1 p-4 pl-0 flex items-center justify-center text-richblack-100 font-medium text-base'>
//                     ₹ {course.price}
//                     </div>

//                     {/* Actions */}
//                     <div className='col-span-1 flex items-center justify-center gap-x-1 text-richblack-100 font-medium text-xl pr-6'>
//                         <HiPencil onClick={() => editCourseHandler(course)}
//                         className='cursor-pointer'/>
//                         <MdOutlineDeleteForever onClick={() => deleteCourseHandler(course)} className='cursor-pointer'/>
//                     </div>
//                 </div>
//             )) 
//         }
//         </div>
//       </div> : 'No courses. Please create courses.' 
//       }
//     </div>
//   )
// }

// export default MyCourses
