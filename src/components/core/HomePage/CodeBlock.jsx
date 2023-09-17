import React from 'react'
import CTAButton from './Button';
import {FaArrowRight} from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
const CodeBlock = ({position,heading,subheading,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor}) => {
  return (
    <div className={`flex ${position} my-20 gap-10  `}>

        {/* Section 1 */}
        <div className='w-[50%] flex flex-col gap-8'>
            { heading }
            <div className='text-richblack-300 font-bold'>
                { subheading }
            </div>

            <div className='flex gap-7 mt-8'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.btnText}
                </CTAButton>
            </div>

        </div>

        {/* Section 2 */}
        <div className='relative w-100% lg:w-[50%]'>
            <div className={`w-3/5 h-52 opacity-20 absolute bg-gradient-to-br ${backgroundGradient} blur-2xl rounded-[75%] -left-2 -top-3 z-10`}/>

            <div className='h-fit flex text-[14px] py-4 z-20 bg-gradient-to-tl from-[#0e1a2d49] to-[#111e3200] w-3/4' >                
                {/*  work -> BG gradient */}
                <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                    <TypeAnimation
                        sequence={[codeblock,2000,""]}
                        repeat={Infinity}
                        cursor
                        omitDeletionAnimation
                        style={
                            {
                                whiteSpace:"pre-line",
                                display:"block",
                            }
                        }
                    />
                </div>
            </div>
        </div>
        
      
    </div>
  )
}

export default CodeBlock;
