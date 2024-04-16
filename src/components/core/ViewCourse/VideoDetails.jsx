import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { Player } from 'video-react';
// import '~video-react/dist/video-react.css';
import {AiFillPlayCircle} from 'react-icons/ai';
import IconBtn from '../../Common/IconBtn';

const VideoDetails = () => {

  const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const {token} = useSelector((state) => state.auth);
  const {courseSectionData, courseEntireData, completedLectures} = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const setVideoSpecificDeatils = async() => {
      if(!courseSectionData.length) return;
      if(!courseId && !sectionId && !subSectionId) {// here
        navigate("/dashboard/enrolled-courses"); 
      }else {
        const filteredData = courseSectionData.filter( (course) => (course._id === sectionId) )
        console.log("course section data" ,courseSectionData)
        const filteredVideoData = filteredData?.[0].subSection.filter((data) => data._id === subSectionId)

        setVideoData(filteredVideoData[0]);
        setVideoEnded(false)
      }
    }
    setVideoSpecificDeatils();

  },[courseSectionData,courseEntireData,location.pathname,sectionId,subSectionId,completedLectures,courseId,navigate])

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )
    if(currentSectionIndex === 0 && currentSubSectionIndex === 0) return true;
    else return false;
  }
  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSections - 1) return true;
    else return false;

  }
  const gotoNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSubSectionIndex !== noOfSubSections - 1){
      // same section next video
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSectionIndex + 1]._id
      // goto next video
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
    }else {
      // different section , first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      // goto next video
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
    }
  }
  const gotoPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    // const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSubSectionIndex !== 0){
      // same section previous video
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSectionIndex - 1]._id
      // goto previous video
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
    }else {
      // different section , first video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
      // goto next video
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
    }
  }
  const HandleLectureCompletion = async() => {
    setLoading(true);

    const res = await markLectureAsComplete({courseId: courseId,subSectionId: subSectionId },token);
    // state update
    if(res) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  }

  return (
    <div className='text-white'>
      
      {
        !videoData ? (<div>No Data Found </div>) : (
          <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
          >
            <AiFillPlayCircle />

            {
              videoEnded && (
                <div>
                  {
                    !completedLectures.includes(subSectionId) && (
                      <IconBtn 
                        disabled={loading}
                        onclick={() => HandleLectureCompletion()}
                        text={!loading ? "Mark as Completed" : "Loading ..."}
                      />
                    )
                  }
                  <IconBtn 
                    disabled={loading}
                    onclick={() => {
                      if(playerRef?.current) {
                        playerRef.current?.seek(0);
                        setVideoEnded(false);
                      }
                    }}

                    text="Rewatch"
                    customClasses="text-xl"
                  />

                  <div>
                    {
                      !isFirstVideo() && (
                        <button
                        disabled={loading}
                        onClick={gotoPrevVideo}
                        className='blackButton'
                        >Prev</button>
                      )
                    }
                    {
                      !isLastVideo() && (
                        <button
                        disabled={loading}
                        onClick={gotoNextVideo}
                        className='blackButton'
                        >Next</button>
                      )
                    }
                  </div>
                </div>
              )
            }


          </Player>
        )
      }
      <h2>
        {videoData?.title}
      </h2>
      <p>
        {videoData?.description}
      </p>
      
    </div>
  )
}

export default VideoDetails
