import React, { useEffect } from 'react'
import { useState } from 'react'
import { IconBase } from 'react-icons';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../Common/IconBtn';

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("");
    const [videobarActive, setVideobarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId,subSectionId} = useParams()
    const {
        courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures,
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
        ;(() => {
            if(!courseSectionData.length) return;

            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
            const currSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);
            const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currSubSectionIndex]?._id;

            // set active/current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            // set active/current sub-section here
            setVideobarActive(activeSubSectionId);
        })()
        console.log();
    },[courseSectionData,courseEntireData, location.pathname])

  return (
    <>
      <div className='text-white'>
        {/* For heading */}
        <div>
            {/* buttons */}
            <div>
                <div
                onClick={() => {navigate('/dashboard/enrolled-courses')}}
                >
                    Back
                </div>
                <div>
                    <IconBtn
                        text="Add Review"
                        onclick={() => setReviewModal(true)}
                     />
                </div>
            </div>

            {/* title */}
            <div>
                <p>{courseEntireData?.courseName}</p>
                <p>{completedLectures?.length} / {totalNoOfLectures}</p>
            </div>
        </div>

        {/* Sections and subsections */}
        <div>
            {
                courseSectionData.map((section, index) => (
                    <div
                    onClick={() => setActiveStatus(section?._id)}
                    key={index}
                    >
                        {/* Section */}
                        <div>
                            <div>
                                {section?.sectionName}
                            </div>
                             {/* Add arrow icon here and handle rorate logic */}
                        </div>

                        {/* SubSections */}
                        <div>
                            {
                                activeStatus === section?._id && (
                                    <div>
                                        {
                                            section.subSection.map((topic,index) => (
                                                <div
                                                    className={`flex gap-3 p-5 ${videobarActive === topic?._id ? "bg-yellow-200 text-richblack-900" : "bg-richblack-900 text-white"}`}
                                                    key={index}
                                                    onClick={() => {
                                                        navigate(`/view-course/${courseEntireData?._id}/section/%${section._id}/sub-section/${topic._id}`)
                                                        setVideobarActive(topic._id)
                                                    }}
                                                >
                                                    <input
                                                        type='checkbox'
                                                        checked = {completedLectures.includes(topic?._id)}
                                                        onChange={() => {}}
                                                    />
                                                    {topic.title}
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>

                    </div>
                ))
            }
        </div>


      </div>
    </>
  )
}

export default VideoDetailsSidebar
