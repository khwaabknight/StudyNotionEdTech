import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import CourseCard from './CourseCard'

const CourseSlider = ({Courses}) => {
  return (
    <div>
      {
        Courses?.length ? (
          <Swiper 
            slidesPerView={1}
            loop={true}
            spaceBetween={500}
          >
            {
              Courses?.map((course, index) => (
                <SwiperSlide key={index} >
                  <CourseCard course={course} Height='h-[250px]' />
                </SwiperSlide>
              ))
            }
          </Swiper>
        ) : (
          <p>No Course Found</p>
        )
      }
    </div>
  )
}

export default CourseSlider
