import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
// import {Autoplay, FreeMode,Navigation,Pagination} from "swiper";
import ReactStars from "react-rating-stars-component";
import { useEffect } from 'react'
import { useState } from 'react'
// import { useFetcher } from 'react-router-dom'
import { apiConnector } from '../../services/apiconnector'
import { ratingsEndpoints } from '../../services/apis';
// import RatingStars from './RatingStars'
import { FaStar } from 'react-icons/fa'

export const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    // const truncatewords = 15;

    useEffect(() => {
        const fetchAllReviews = async() => {
            const {data} = await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API);
            // console.log("Rating review details api",data)

            if(data?.success) {
                setReviews(data?.data);
            }
        }
        fetchAllReviews();
    },[setReviews]);


  return (
    <div className='h-[190px] w-full text-white'>
        <Swiper 
        slidesPerView={4}
        spaceBetween={24}
        loop={true}
        freeMode={true}
        autoplay={{
            delay:2500,
        }}
        // modules={[Pagination]}
        className='w-full'
        >
            {
                reviews.map((review,index) => (
                    <SwiperSlide key={index} >
                        <img 
                        src={review?.user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                        alt='profile'
                        className='h-9 w-9 object-cover rounded-full'
                        />
                        <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                        <p>{review?.course?.courseName}</p>
                        <p>
                            {review?.review}
                        </p>
                        <p>{review?.rating.toFixed(1)}</p>
                        <ReactStars
                        count={5}
                        value={review.rating}
                        size={20}
                        edit={false}
                        activeColor={"#ffd700"}
                        emptyIcon={<FaStar/>}
                        fullIcon={<FaStar/>}
                        />
                    </SwiperSlide>
                ))
            }
        </Swiper>
        
    </div>
  )
}
