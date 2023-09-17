import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RxDropdownMenu} from 'react-icons/rx'
import {HiPencil} from 'react-icons/hi2'
import {MdOutlineDeleteForever} from 'react-icons/md'
import {AiFillCaretDown, AiOutlinePlus} from 'react-icons/ai'
import SubSectionModal from './SubSectionModal'
import ConfirmationModal from '../../../../Common/ConfirmationModal'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'


const NestedView = ({handleChangeEditSectionName}) => {

  const {course} = useSelector((state) => state.course)
  const {token} = useSelector((state) => state.auth)
  const dispatch =  useDispatch();
  const [addSubSection, setAddSubSection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
   
  const handleDeleteSection = async (sectionId) => {
    const result  = await deleteSection({
      sectionId,
      courseId:course._id,
      token,
    })

    if(result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  }  
  const handleDeleteSubSection = async (subSectionId,sectionId) => {
    const result = await deleteSubSection({subSectionId,sectionId,token});
    if(result) {
      const updatedCourseContent = course.courseContent.map((section) => 
        section._id === sectionId ? result : section
      )
      const updatedCourse = {...course,courseContent:updatedCourseContent};
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  }

  useEffect(() => {
    console.log(course.courseContent);
  },[course])


  return (
    <div className='bg-richblack-700 px-6 font-semibold text-base text-richblack-50'>
      
      <div>
        {
          course.courseContent.map((section) => (
                        
            <details key={section._id} open>
              <summary className='flex items-center justify-between gap-x-3 border-b'>

                <div className='flex items-center justify-center gap-x-2'>
                  <RxDropdownMenu className='-translate-y-[5%]' size={25}/>
                  <p>{section.sectionName}</p>
                </div>
                <div className='flex items-center gap-x-3'>
                  <button onClick={() => {handleChangeEditSectionName(section._id, section.sectionName)}}>
                    <HiPencil/>
                  </button>
                  <button 
                    onClick={() => {setConfirmationModal({
                      text1: "Delete this section",
                      text2: "All the sections int this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })}}
                  >
                    <MdOutlineDeleteForever/>
                  </button>
                  <span>|</span>
                  <AiFillCaretDown/>
                </div>
              </summary>
              
                    
              {/* Lectures */}
              <div>
                {
                  section.subSection.map((data) => (
                    <div key={data._id}
                      onClick={() => setViewSubSection(data)}
                      className='flex items-center justify-between gap-x-3 border-b-2'
                    >                    
                      <div className='flex items-center gap-x-3'>
                        <RxDropdownMenu/>
                        <p>{data.title}</p>
                      </div>
                      <div
                      onClick={(e) => e.stopPropagation()}
                      className='flex items-center gap-x-3'
                      > 
                        <button 
                          onClick={() => {setEditSubSection({...data, sectionId:section._id})}}
                        >
                          <HiPencil/>
                        </button>
                        <button
                          onClick={() => {setConfirmationModal({
                            text1: "Delete this subSection",
                            text2: "Selected lecture will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleDeleteSubSection(data._id,section._id),
                            btn2Handler: () => setConfirmationModal(null),
                          })}}
                        >
                          <MdOutlineDeleteForever/>
                        </button>
                      </div>
                    </div>
                  ))
                }
                <button
                  onClick={() => setAddSubSection(section._id)}
                  className='mt-4 flex items-center gap-x-2 text-yellow-50'
                >
                  <AiOutlinePlus/>
                  <p>Add Lecture</p>
                </button>
              </div>

            </details>
          ))
        }
      </div>


      {
        addSubSection ? (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true}/>) 
        : (viewSubSection ? <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}/> 
        : (editSubSection ? <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}/> : <div></div>)
        )
      }
      
      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
      }
    </div>
  )
}

export default NestedView
