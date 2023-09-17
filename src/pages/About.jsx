import React from 'react'
import GradientHeadingText from '../components/core/About/GradientHeadingText'
import StatsComponent from '../components/core/About/Stats'
import LearningGrid from '../components/core/About/LearningGrid'
import ContactFormSection from '../components/core/About/ContactFormSection'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/About/Quote'
import FoundingStory from '../assets/Images/FoundingStory.png'
import Footer from '../components/Common/Footer'
import GradientText from '../components/core/About/GradientText'


const About = () => {
  return (
    <div>
      <div className='text-richblack-5 font-inter'>
        {/* Section 1 */}
        
          <section className='flex flex-col bg-richblack-800'>
          <div className='text-base text-richblack-200 font-medium text-center py-1.5 mt-20 mb-10'>About us</div>
            <div className='relative w-11/12 max-w-maxContent mx-auto '>
                <header>
                    <div className='text-4xl text-center font-semibold mb-4'>Driving Innovation in Online Education for a <br/>
                    <GradientText text={"Brighter Future"} gradient={'from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb]'}/></div>
                    
                    <p className='font-medium text-base text-richblack-300 text-center mb-10'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a <br className='hidden lg:block'/> brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a <br className='hidden lg:block'/> vibrant learning community. </p>
                </header>
                
                <div className='flex absolute gap-5 justify-between p-10'>
                    <div className='basis-1/3'><img src={BannerImage1} alt='' className='object-cover'/></div>
                    <div className='basis-1/3'><img src={BannerImage2} alt='' className='object-cover'/></div>
                    <div className='basis-1/3'><img src={BannerImage3} alt='' className='object-cover'/></div>
                </div>
                <div className='h-64'/>
            </div>
          </section>

        {/* Section 2 */}
        <section className='mt-32'>
          <div>
              <Quote/>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <div className='flex flex-col w-11/12 max-w-maxContent
           mx-auto my-20'>
              {/* Founding story div */}
              <div className='flex gap-x-28 my-24'>
                  {/* Founding story left */}                
                  <div className='w-[45%] py-7'>
                    <GradientHeadingText heading={"Our Founding Story"} gradient={"from-[#833AB4] via-[#FD1D1D] to-[#FCB045]"} headingStyle={'font-semibold text-4xl'}>
                        <p className='font-medium text-richblack-300 text-base pt-6 tracking-wider'>
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.<div className='h-3'></div>
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </p>
                    </GradientHeadingText>
                  </div>
                  {/* Founding story right */}
                  <div className='flex justify-center items-center p-8 relative'>
                      <div className='w-4/5 h-52 opacity-20 absolute bg-gradient-to-br from-[#EC008C] to-[#FC6767] blur-2xl rounded-[75%] -left-1 top-4'/>
                      <img src={FoundingStory} alt='' className='h-60 z-10'/>
                  </div>
              </div>

              {/* Vission and mission divs */}
              <div className='flex justify-around items-baseline gap-24'>
                  {/* Our vision div */}
                  <div className='w-[40%] py-7 -translate-x-3'>
                    <GradientHeadingText heading={'Our vision'} gradient={"from-[#E65C00] to-[#F9D423]"} headingStyle={'font-semibold text-4xl'}>
                        <p className='font-medium text-richblack-300 text-base pt-6 tracking-wider'>
                        With this vision in mind, we set out on a journey to create an e- learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                        </p>
                    </GradientHeadingText>
                  </div>

                  {/* Our mission div */}
                  <div className='w-[40%] py-7'>
                    <GradientHeadingText heading={'Our mission'} gradient={'from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]'} headingStyle={'font-semibold text-4xl'}>
                        <p className='font-medium text-richblack-300 text-base pt-6 tracking-wider'>
                        our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>

                    </GradientHeadingText>
                  </div>
              </div>
          </div>
        </section>

        {/* Section 4 */}
        <StatsComponent />

        {/* Section 5 */}
        <section className='flex flex-col items-center justify-center gap-44 my-24 w-11/12 max-w-maxContent mx-auto'>
          <LearningGrid/>
          <ContactFormSection/>
        </section>
      </div>
      <Footer/>
    </div>
  )
}

export default About
