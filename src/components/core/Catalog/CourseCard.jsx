import React from 'react'
import { Link } from 'react-router-dom'
import {RatingStars} from '../../Common/RatingStars'
import { useState } from 'react'
import { useEffect } from 'react'
import GetAvgRating from '../../../utils/avgRating'

const CourseCard = ({course,Height}) => {

  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingsAndReviews);
    setAvgReviewCount(count);
  })

  return (
    <div>
      <Link to={`/courses/${course._id}`}>

        <div>

          <div>
            <img src={course?.thumbnail} alt='Course Banner' className={`${Height} w-full rounded-xl object-cover`}/>
          </div>

          <div>
            <p>{course?.courseName}</p>
            <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
            <div>
              <span>{avgReviewCount || 0}</span>
              <RatingStars Review_Count = {avgReviewCount}/>
              <span>{course?.ratingsAndReviews?.length} Ratings</span>
            </div>
            <p>{course?.price}</p>
          </div>

        </div>

      </Link>
    </div>
  )
}

export default CourseCard
