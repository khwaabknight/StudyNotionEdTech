import React, { useState } from 'react';
import { AiOutlineEye , AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../services/operations/authAPI';
import SubmitButton from '../../Common/SubmitButton';

const LoginForm = ({setIsLoggedIn}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({email:"",password:""});
  const [showPassword, setShowPassword] = useState(false)

  function changeHandler(event) {
    setFormData( (prevData) => (
      {
          ...prevData,
          [event.target.name] : event.target.value
      }
    ))
  }

  const {email,password} = formData;

  function submitHandler(event) {
    event.preventDefault();
    dispatch(login(email,password,navigate));
  }

  return (
    <form onSubmit={submitHandler}
    className='flex flex-col w-full gap-y-4 mt-6 '>
    
      {/* Email input */}
      <label className='w-full'>
        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address <sup className='text-pink-200'>*</sup></p>
        <input required
        type="email" 
        value={email}
        onChange={changeHandler}
        placeholder="Enter email id"
        name='email'
        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
        />
      </label>
      {/* password input */}
      <label className='w-full relative'>
        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Password<sup className='text-pink-200'>*</sup></p>
        <input required 
        type={showPassword?("text"):("password")}
        value={password}
        onChange={changeHandler}
        placeholder="Enter Password"
        name='password'
        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
        />
        <span className='absolute right-3 top-[38px] z-10 cursor-pointer' onClick={()=>setShowPassword((prev) => !prev)}>
            {showPassword?(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2FB'/>):(<AiOutlineEye fontSize={24} fill='#AFB2FB'/>)}
        </span>
        {/* Forgot password link */}
        <Link to="/forgot-password">
            <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                Forgot Password ?
            </p>
        </Link>
      </label>

      {/* Sign in button */}
      <SubmitButton >
        Sign In
      </SubmitButton>
    </form>
  )
}

export default LoginForm;
