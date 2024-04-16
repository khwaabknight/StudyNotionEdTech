import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../Common/IconBtn';
import {MdAddCircleOutline} from 'react-icons/md';
import {AiFillCaretLeft, AiFillCaretRight} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import {toast} from 'react-hot-toast'
import NestedView from './NestedView';

const CourseBuilderForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    // getValues,
    formState:{errors},
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const {token} = useSelector((state) => state.auth)

  const onSubmitHandler = async (data) => {
    setLoading(true);
    let result;
    if(editSectionName){  // if we are editing the section name      
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, token
      )
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },token
      )
    }

    console.log('api respponse',result)
    console.log('course data',course)

    // update values
    if(result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue('sectionName','');
    }

    setLoading(false);

  }

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue('sectionName',"");
  }


  // Back button handler
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  // Next button handler
  const gotoNext = () => {
    if(course.courseContent.length === 0) {
      toast.error('Please add atleast one Section')
      return
    }
    if(course.courseContent.some((section) => section.subSection.length === 0) ){
      toast.error('Please add atleast one lecture in each section');
      return 
    }

    dispatch(setStep(3));
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId) {
      cancelEdit();
      return
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);
  }

  if(loading) return (<div>Loading...</div>)

  return (
    <div className='text-richblack-5 bg-richblack-800 border border-richblack-700 rounded-md p-6 flex flex-col gap-y-7'>
      <h2 className='font-semibold text-richblack-5 text-2xl'>Course Builder</h2>
      <form onSubmit={handleSubmit(onSubmitHandler)} className='flex flex-col gap-y-6'>
        {/* Section Name text input */}
        <div className='flex flex-col gap-y-1.5'>
          <label htmlFor='sectionName' className='font-normal text-sm'>Section Name <sup className='text-pink-200'>*</sup></label>
          <input
            id='sectionName'
            placeholder='Add section name'
            {...register("sectionName",{required:true})}
            className='p-3 bg-richblack-700 rounded-lg shadowins text-richblack-200 text-base font-medium'
          />
          {
            errors.sectionName && (<span className='text-pink-400 italic'>Section Name is required**</span>)
          }
        </div>

        {/* Button for create and edit secion */}
        <div className='flex gap-x-5'>
          <IconBtn 
            type='submit'
            text={editSectionName ? 'Edit Section Name' : 'Create Section'}
            customClasses='flex flex-row-reverse items-center justify-center gap-x-2 border rounded-md py-2 px-6 text-yellow-50'
          >
          <MdAddCircleOutline/> 
          </IconBtn>
          {editSectionName && (
            <IconBtn
            text='Cancel Edit'
            type='button'
            onclick={cancelEdit}
            customClasses='border rounded-md py-2 px-6 text-richblack-50'
            />
          ) }
        </div>
      </form>
      
      {course?.courseContent?.length > 0 && (<NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>)}

      <div className='flex justify-end gap-x-3'>
        <IconBtn
          text="Back"
          onclick={goBack}
          customClasses='flex flex-row-reverse items-center justify-center gap-x-2 bg-richblack-700 rounded-lg text-lg font-base text-richblack-5 px-5 py-2 shadowins'
        >
          <AiFillCaretLeft />
        </IconBtn>
        <IconBtn
          text="Next"
          onclick={gotoNext}
          customClasses='flex items-center justify-center gap-x-2 bg-yellow-50 rounded-lg text-lg font-semibold text-richblack-900 px-5 py-2 shadowins'
        >
          <AiFillCaretRight />
        </IconBtn>
      </div>

    </div>
  )
}

export default CourseBuilderForm
