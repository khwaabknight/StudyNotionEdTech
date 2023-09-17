import React from 'react';
import {FaArrowRight} from "react-icons/fa";
import {Link} from "react-router-dom";
import HighLightText from '../components/core/HomePage/HighLightText';
import CTAButton from '../components/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4";
import CodeBlock from '../components/core/HomePage/CodeBlock';
import Footer from '../components/Common/Footer';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
const Home = () => {
  return (
    <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between '>
      
      {/* Section 1 */}
      <div>
        <Link to={"/signup"}>
            <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 hover:bg-richblack-900 w-fit shadowins'>
                <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]'> {/* group-hover:bg-richblack-900 */}
                    <p>Become an instructor</p>
                    <FaArrowRight/>
                </div>
            </div>
        </Link>

        <div className='text-center text-4xl font-semibold mt-7 '>Empower Your Future with <HighLightText text={"Coding Skills"}/></div>

        <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4 '>
        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>

        {/* Buttons */}
        <div className='flex flex-row gap-7 mt-8 justify-center items-center'>
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        
        {/* Video */}
        <div className='relative mx-3 my-20'>
          <div className='absolute w-11/12 h-96 bg-blue-200 blur-3xl left-4 top-8 z-0 rounded-[80%]'></div>
          <div className='h-[700px]'>
          <video muted loop autoPlay className='z-10 absolute'>
            <source src={Banner} type='video/mp4' />
          </video>
          </div>
          
        </div>

        {/* Code Section 1 */}
        <div>
          <CodeBlock 
            position={"lg:flex-row"} 
            heading={
              <div className='text-4xl font-semibold '>Unlock Your <HighLightText text={"coding potential"}/><br/> with our online courses </div>
            }
            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            ctabtn1={
              {
                btnText:"try it yourself",
                linkto:"/signup",
                active:true,
              }
            }
            ctabtn2={
              {
                btnText:"learn more",
                linkto:"/login",
                active:false,
              }
            }
            codeblock = {`<!DOCTYPE html>\n<html>\n<head><>Example</\ntitle><link rel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two\n</a><a href="three/">Three</a>\n</nav>`}
            backgroundGradient={"from-[#8a2be2] via-[#ffa500] to-[#f8f8ff]"}
            codeColor={"text-blue-50"}
          />
        </div>
        {/* Code Section 2 */}
        <div>
          <CodeBlock 
            position={"lg:flex-row-reverse"} 
            heading={
              <div className='text-4xl font-semibold '>Start <HighLightText text={"coding  "}/> <br/> <HighLightText text={"in seconds"}/> </div>
            }
            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
            ctabtn1={
              {
                btnText:"Continue lesson",
                linkto:"/signup",
                active:true,
              }
            }
            ctabtn2={
              {
                btnText:"learn more",
                linkto:"/login",
                active:false,
              }
            }
            codeblock = {`<!DOCTYPE html>\n<html>\n<head><>Example</\ntitle><link rel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two\n</a><a href="three/">Three</a>\n</nav>`}
            backgroundGradient={"from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb]"}
            codeColor={"text-pink-100"}
          />
        </div>

        <ExploreMore/>

      </div>
      
      

      {/* Section 2 */}
      <div className='bg-pure-greys-10 text-richblack-700 w-screen'> 

        <div className='homepage_bg h-[300px]'>
            <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
            <div className='h-[150px]'></div>
              <div className='flex flex-row gap-7 text-white'>
                <CTAButton active={true} linkto={"signup"}>
                  <div className='flex gap-3 items-center'>Explore Full Catalog <FaArrowRight/></div>
                </CTAButton>
                <CTAButton active={false} linkto={"/signup"} >
                  <div>Learn more</div>
                </CTAButton>
              </div>
            </div>
        </div>

        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

          <div className='flex flex-row gap-24 my-10'>
            <div className=' text-4xl font-semibold w-[45%] '>
              Get the skills you need for a
              <HighLightText text={'job that is in demand.'}/>
            </div>

            <div className='flex flex-col gap-10 w-[40%] items-start'>
              <div className='text-base'>
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn more</div>
              </CTAButton>
            </div>

            
          </div>

          <TimelineSection/>

          <LearningLanguageSection/>
          
        </div>

        

      </div>


      {/* Section 3 */}
      <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900'>

        <InstructorSection/>

        <h2 className='text-center text-4xl font-semibold mt-10'>Reviews from other learners</h2>

        {/* Review Slider Carousel */}

      </div>


      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home;
