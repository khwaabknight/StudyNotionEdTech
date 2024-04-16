import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import IconBtn from '../../../../Common/IconBtn';
import { toast } from 'react-hot-toast';
import Upload from '../Upload'

const SubSectionModal = ({modalData,setModalData,add=false,view=false,edit=false}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
        getValues,
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const {token} = useSelector((state) => state.auth);
    const {course} = useSelector((state) => state.course);

    useEffect(() => {
        if(view || edit) {
            setValue('lectureTitle', modalData.title);
            setValue('lectureDesc', modalData.description);
            setValue('lectureVideo', modalData.videoUrl);
        }
    },[edit,view,modalData,setValue]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        return currentValues.lectureTitle !== modalData.title ||
          currentValues.lectureDesc !== modalData.description ||
          currentValues.lectureVideo !== modalData.videoUrl  
    }

    const handleEditSubSection = async(data) => {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append('sectionId', modalData.sectionId);
        formData.append('subSectionId', modalData._id);

        if(currentValues.lectureTitle !== modalData.title) {
            formData.append('title', currentValues.lectureTitle);
        }
        if(currentValues.lectureDesc !== modalData.description) {
            formData.append('description', currentValues.lectureDesc);
        }
        if(currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append('videoUrl', currentValues.lectureVideo);
        }

        setLoading(true);
        // Api call
        const result = await updateSubSection(formData,token);

        if(result) {
            const updatedCourseContent = course.courseContent.map((section) => (
                section._id === modalData.sectionId ? result : section
            ))
            const updatedCourse = {...course,courseContent:updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    }

    const onSubmitHandler = async(data) => {
        if(view) return;

        if(edit) {
            if(!isFormUpdated()) {
                toast.error('No changes made to the form')
            }else {
                // edit 
                handleEditSubSection();
            }
            return;
        }

        const formData = new FormData();
        formData.append('sectionId', modalData);
        formData.append('title',data.lectureTitle);
        formData.append('description',data.lectureDesc);
        formData.append('video',data.lectureVideo);
        setLoading(true);
        // api call
        const result = await createSubSection(formData,token);
        console.log(result)

        if(result) {
            console.log(modalData)
            const updatedCourseContent = course.courseContent.map((section) => (
                section._id === modalData ? result : section
            ))
            
            const updatedCourse = {...course,courseContent:updatedCourseContent};
            console.log(updatedCourse)
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    }
  return (
    <div>

        <div>
            <div>
                <p>{view && 'Viewing'}{add && 'Adding'}{edit && 'Editing'} Lecture</p>
                <button onClick={() => {!loading && setModalData(null)}}><RxCross1/></button>
            </div>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Upload 
                    name='lectureVideo'
                    label='Lecture Video'
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editData={edit ? modalData.videoUrl : null}
                />
                <div>
                    <label>Lecture Title</label>
                    <input
                        id='lectueTitle'
                        placeholder='Enter Lecture title'
                        {...register('lectureTitle',{required:true})}
                        className='w-full'
                    />
                    {
                        errors.lectureTitle && <span>Lecture Title is required **</span>
                    }
                </div>
                <div>
                    <label>Lecture Description</label>
                    <textarea
                        id='lectureDesc'
                        placeholder='Enter Lecture Description'
                        {...register('lectureDesc',{required:true})}
                        className='w-full min-h-[130px]'
                    />
                    {
                        errors.lectureDesc && <span>Lecture Description is required</span>
                    }
                </div>

                {
                    !view && (
                        <div>
                            <IconBtn
                                text={loading ? 'Loading...' : edit ? 'Save Changes' : 'Save'}
                            />
                        </div>
                    )
                }
            </form>
        </div>
      
    </div>
  )
}

export default SubSectionModal
