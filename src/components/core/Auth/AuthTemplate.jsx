import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import frameImage from '../../../assets/Images/frame.png'

const AuthTemplate = ({title,desc1,desc2,image,formtype, setIsLoggedIn}) => {
    return (
        <div className='flex justify-between w-11/12 max-w-maxContent py-12 mx-auto gap-x-12 gap-y-0'>
            <div className='w-11/12 max-w-[450px]'>
                <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'
                >{title}</h1>
                <p className='text-[1.125rem] leading-[1.625rem] mt-4'>
                    <span className='text-richblack-100'>{desc1}</span>
                    <br/>
                    <span className='text-blue-100 italic'>{desc2}</span>
                </p>
    
                {formtype==="signup"? <SignupForm/> : <LoginForm/>}
            </div>
    
            <div className='relative w-11/12 max-w-[450px]'>
                <img src={frameImage}
                    alt='pattern'
                    width={558}
                    height={504}
                    loading='lazy'
                />
    
                <img src={image}
                    alt='Students'
                    width={558}
                    height={504}
                    loading='lazy'
                    className='absolute -top-4 right-4'
                />
            </div>
    
    
        </div>
      )
}

export default AuthTemplate
