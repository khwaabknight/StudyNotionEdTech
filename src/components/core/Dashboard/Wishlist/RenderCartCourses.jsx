import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import {BsStar,BsStarFill} from 'react-icons/bs'
import {MdOutlineDeleteForever} from 'react-icons/md'
import { removeFromCart } from '../../../../slices/cartSlice';

import FoundingStoryImg from '../../../../assets/Images/FoundingStory.png'


const RenderCartCourses = () => {
    const cart = [
        {
            thumbnail:FoundingStoryImg,
            courseName:'Cloud Computing',
            courseDescription:'Full Practice Exam included + explanations | Learn Cloud Computing | Pass the AWS Cloud Practitioner CLF-C01 exam!',
            totalDuration:'20hr 10mins',
            progressPercentage: 65,
            category:{
                name:'Web-dev',
            },
            ratingsAndReviews:[
                {
                    rating:4,
                }
            ],
            price:529,
        },
        {
            thumbnail:FoundingStoryImg,
            courseName:'Devops',
            courseDescription:'Short Description',
            totalDuration:'52hr 30mins',
            progressPercentage: 100,
            category:{
                name:'Web-dev',
            },
            ratingsAndReviews:[
                {
                    rating:4,
                }
            ],
            price:529,
        }
    ]

    // const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

  return (
    <div className='flex flex-col gap-y-8 w-3/4 text-white py-6 pl-6'>
      {
        cart.map((course,index) => (
            <div key={index} className='flex flex-col'>
                {index ? <div className='h-[1px] bg-richblack-700 mb-8'/>  : ""}
                <div className='grid grid-cols-11 gap-x-5 w-full h-fit'>
                    <img src={course?.thumbnail} className='w-full rounded-md aspect-[4/3] col-span-3'/>
                    <div className='flex flex-col gap-y-3 col-span-6'>
                        <p className='text-3xl font-medium text-richblack-5 h-20'>{course?.courseName}</p>
                        <p className='text-base font-normal text-richblack-300'>{course?.category?.name}</p>
                        <div className='flex gap-x-2 items-center'>
                            <span className='text-xl font-semibold text-yellow-100'>4.8</span>
                            <ReactStars 
                                count={5}
                                size={20}
                                edit={false}
                                activeColor='#ffd700'
                                emptyIcon={<BsStar/>}
                                fullIcon={<BsStarFill/>}
                                value={4.5}
                            />
                            <span className='text-xl font-normal text-richblack-400'>{ '(' + course?.ratingsAndReviews?.length + ')'}</span>
                        </div>
                        <div className='flex gap-x-2 items-center'>
                            <span className='text-xl font-semibold text-yellow-100'>4.8</span>
                            <ReactStars 
                                count={5}
                                size={20}
                                edit={false}
                                activeColor='#ffd700'
                                emptyIcon={<BsStar/>}
                                fullIcon={<BsStarFill/>}
                                value={4.5}
                            />
                            <span className='text-xl font-normal text-richblack-400'>{ '(' + course?.ratingsAndReviews?.length + ')'}</span>
                        </div>
                    </div>

                    <div className='col-span-2 flex flex-col gap-y-5'>
                        <button onClick={() => dispatch(removeFromCart(course._id))} className='flex items-center justify-center py-3 gap-x-2 rounded-lg border border-richblack-700 bg-richblack-800 text-pink-200'>
                            <MdOutlineDeleteForever size={30}/>
                            <p className='text-xl font-semibold'>Remove</p>
                        </button>
                        <p className='text-semibold text-yellow-50 text-4xl'>Rs. {course?.price}</p>
                    </div>
                </div>
                
            </div>
        ))
      }
    </div>
  )
}

export default RenderCartCourses
