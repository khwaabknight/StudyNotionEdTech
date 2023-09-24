import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import {addCourseDetails, editCourseDetails, fetchCourseCategories} from '../../../../../services/operations/courseDetailsAPI'
import {HiOutlineCurrencyRupee} from 'react-icons/hi2'
import RequirementField from './RequirementField'
import IconBtn from '../../../../Common/IconBtn'
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import { toast } from 'react-hot-toast';
import {COURSE_STATUS} from '../../../../../utils/constants'
import TagInput from './TagInput';
import Upload from '../Upload';
import {AiFillCaretRight} from 'react-icons/ai';

const CourseInformationForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors},
  } = useForm();

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth)
  const {course,editCourse} = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async() => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if(categories.length > 0) {
        setCourseCategories(categories)
      }
      setLoading(false);
    }

    // if form is in edit mode you can edit the details
    if(editCourse) {
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.learnings)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }

    getCategories();
  },[])

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString !== course.tag.toString() ||
      currentValues.courseBenefits !== course.learnings ||
      currentValues.courseCategory !== course.category ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
      )
  }

  // handles next button onClick
  const onSubmitHandler = async(data) => {
    if(editCourse) {
      if(isFormUpdated()){
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("courseId",course._id);
        if(currentValues.courseTitle !== course.courseName) {
          formData.append("courseName",data.courseTitle);
        }
        if(currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription",data.courseShortDesc);
        }
        if(currentValues.coursePrice !== course.price) {
          formData.append("price",data.coursePrice);
        }
        if(currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag",JSON.stringify(data.courseTags));
        }
        if(currentValues.courseBenefits !== course.learnings) {
          formData.append("learnings",data.courseBenefits);
        }
        if(currentValues.courseCategory !== course.category) {
          formData.append("category",data.courseCategory);
        }

        if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions",JSON.stringify(data.courseRequirements));
        }
        if(currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnail",data.courseImage);
        }
        
        setLoading(true);
        const result = await editCourseDetails(formData,token);     
        if(result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
        setLoading(false);
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    // create a new course
    const formData = new FormData();
    formData.append("courseName",data.courseTitle);
    formData.append("courseDescription",data.courseShortDesc);
    formData.append("price",data.coursePrice);
    formData.append("tag",JSON.stringify(data.courseTags));
    formData.append("learnings",data.courseBenefits);
    formData.append("category",data.courseCategory);
    formData.append("thumbnail",data.courseImage);
    formData.append("instructions",JSON.stringify(data.courseRequirements));
    formData.append("status",COURSE_STATUS.DRAFT);

    setLoading(true);
    const result = await addCourseDetails(formData,token);
    if(result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmitHandler)}
      className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
    >
    {/* Course Title  */}
      <div className='flex flex-col gap-1.5'>
        <label htmlFor='courseTitle' className='font-normal text-sm text-richblack-5'>Course Title <sup className='text-pink-200'>*</sup></label>
        <input 
          id='courseTitle'
          placeholder='Enter Course Title'
          {...register("courseTitle", {required:true})}
          className='p-3 bg-richblack-700 rounded-lg shadowins text-richblack-200 text-base font-medium'
        />
        {
          errors.courseTitle && (
            <span className='text-pink-600 italic'>Course Title is Required **</span>
          )
        }
      </div>
    {/* COurse Description */}
      <div className='flex flex-col gap-1.5'>
        <label htmlFor='courseShortDesc' className='font-normal text-sm text-richblack-5'>Course Short Description <sup className='text-pink-200'>*</sup></label>
        <textarea 
          id='courseShortDesc'
          placeholder='Enter Description'
          rows={5}
          {...register("courseShortDesc",{required:true})}
          className='p-3 bg-richblack-700 rounded-lg shadowins text-richblack-200 text-base font-medium'
        />
        {
          errors.courseShortDescription && (
            <span className='text-pink-600 italic'>Course Description is required **</span>
          )
        }
      </div>
    {/* Course Price */}
      <div className='flex flex-col gap-1.5 relative'>
        <label htmlFor='coursePrice' className='font-normal text-sm text-richblack-5'>Course Price <sup className='text-pink-200'>*</sup></label>
        <input 
          id='coursePrice'
          placeholder='Enter Course Price'
          {...register("coursePrice",{
            required:true,
            valueAsNumber:true
          })}
          className='p-3 pl-10 bg-richblack-700 rounded-lg shadowins text-richblack-200 text-base font-medium'
        />
        <HiOutlineCurrencyRupee className='absolute left-3 top-10' size={20}/>
        {
          errors.courseTitle && (
            <span className='text-pink-600 italic'>Course Price is Required ** </span>
          )
        }
      </div>
    {/* Course Category */}
      <div className='flex flex-col gap-1.5'>
        <label htmlFor='courseCategory' className='font-normal text-sm text-richblack-5'>Course Category <sup className='text-pink-200'>*</sup></label>
        <select 
         id='courseCaegory'
         defaultValue=""
         {...register("courseCategory",{required:true})}
         className='p-3 bg-richblack-700 rounded-lg shadowins text-richblack-200 text-base font-medium'
        >
          <option value="" disabled>Choose a Category</option>
          {
            !loading && courseCategories.map((category,index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))
          }
        </select>
        {errors.courseCategory && (
          <span className='text-pink-600 italic'>
            Course Category is Required
          </span>
        )}
      </div>

      {/* Create a custom component for handling tags input */}
      {/* props = label,name,placeholder,register,errors,setValue,getValues */}
      <TagInput
        label='Tags'
        name='courseTags'
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <Upload 
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
      {/* create a component for uploading and showing preview of media */}
      {/* Props = name ,label,register,errors,setValue */}

      {/* Benefits of the Course */}
      <div className='flex flex-col gap-1.5'>
        <label htmlFor='courseBenefits' className='font-normal text-sm text-richblack-5'>Benefits of the course <sup className='text-pink-200'>*</sup></label>
        <textarea 
          id='courseBenefits'
          placeholder='Enter Benefits of the course'
          {...register("courseBenefits",{required:true})}
          rows={3}
          className='p-3 bg-richblack-700 rounded-lg shadowins text-richblack-200 text-base font-medium'
        />
        {
          errors.courseBenefits && (
            <span className='text-pink-600 italic'>
              Benefits of the course are required**
            </span>
          )
        }
      </div>

      {/* Requirement field */}
      <RequirementField 
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        placeholder={"Enter requirements or instructions of course"}
        setValue={setValue}
        getValues={getValues}
        // initialValue={}
      />

      <div className='flex justify-end items-center gap-x-5 pr-1'>
        {
          editCourse && (
            <IconBtn
            type={'button'}
            customClasses='bg-richblack-700 rounded-lg text-lg font-base text-richblack-5 px-5 py-2 shadowins'
            text='Continue Without Saving'
            onclick={() => dispatch(setStep(2))}
            />
          )
        }
        <IconBtn
          type='submit'
          text={!editCourse ? "Next" : "Save Changes"}
          customClasses='flex items-center justify-center gap-x-2 bg-yellow-50 rounded-lg text-lg font-semibold text-richblack-900 px-5 py-2 shadowins'
        >{!editCourse && <AiFillCaretRight/>}</IconBtn>
        
      </div>

    </form>
  )
}

export default CourseInformationForm
