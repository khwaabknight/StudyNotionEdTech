import React from 'react'
import GradientText from './GradientText'
import CTAButton from '../HomePage/Button'

const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for ",
        highlightText:"Anyone, Anywhere",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText:"Learn More",
        BtnLink:"/",
    },{
        order:1,
        heading: "Curriculum Based on Industry Needs",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",        
    },{
        order:2,
        heading: "Our Learning Methods",
        description:"The learning process uses the namely online and offline.",        
    },{
        order:3,
        heading: "Certification",
        description:"You will get a certificate that can be used as a certification during job hunting.",        
    },{
        order:4,
        heading: 'Rating "Auto-grading"',
        description:"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",        
    },{
        order:5,
        heading: "Ready to Work",
        description:"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",        
    },
]

const LearningGrid = () => {
  return (
    <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10'>
      {
        LearningGridArray.map((card,index) => {
            return (
                <div key={index}
                    className={`
                    ${index === 0 && "lg:col-span-2"} 
                    ${card.order > 0 && (card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800")}
                    ${card.order === 3 && "lg:col-start-2"}
                    `}

                >
                {
                    card.order === -1 ? (
                        <div className='mr-14 flex flex-col gap-4'>
                            <div className='font-semibold text-4xl text-richblack-5'>
                                {card.heading} <br/>
                                <GradientText text={card.highlightText} gradient={'from-[#5433FF] via-[#20BDFF] to-[#A5FECB]'} />
                            </div>
                            <p className='text-base font-medium text-richblack-300'>{card.description}</p>
                            <div className='py-8 w-fit'>
                                <CTAButton active={true} linkto={card.BtnLink}>
                                    {card.BtnText}
                                </CTAButton>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col p-8 gap-8 aspect-square'>
                            <h2 className='font-semmibold text-richblack-5 text-lg'>{card.heading}</h2>
                            <p className='text-sm font-normal text-richblack-100'>{card.description}</p>
                        </div>
                    )
                }


                </div>
            )
        })
      }
    </div>
  )
}

export default LearningGrid
