import React ,{ useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineEye , AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import {ACCOUNT_TYPE} from '../../../utils/constants'
import Tab from "../../Common/Tab"
import SubmitButton from '../../Common/SubmitButton';


const SignupForm = ({setIsLoggedIn}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:""
  });

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [showPassword, setShowPassword] = useState(false);
  const [confPassword, setConfPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData

  function changeHandler(event) {
    setFormData( (prevData) => (
    {
        ...prevData,
        [event.target.name] : event.target.value
    }
    ))
  }

  function submitHandler(event) {
    event.preventDefault();
    if(password !== confirmPassword){
        toast.error("Passwords do not match");
        return;
    }

    const signupData = {...formData,accountType,}

    // Setting sign up data to redux slices as states , to be used after otp verification
    dispatch(setSignupData(signupData))
    // Send otp to user for verification
    dispatch(sendOtp(formData.email,navigate))

    // Reset values
    setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div>
      {/* student-Instructor tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
        {/* Form */}
      <form onSubmit={submitHandler} className='flex flex-col'>
      {/* fname && lname */}
        <div className='flex gap-x-4 my-[20px]'>
            <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name<sup className='text-pink-200'>*</sup></p>
                <input
                    required
                    type='text'
                    name='firstName'
                    onChange={changeHandler}
                    placeholder = "Enter First Name"
                    value={firstName}
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadowins'
                />
            </label>
            <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name<sup className='text-pink-200'>*</sup></p>
                <input
                    required
                    type='text'
                    name='lastName'
                    onChange={changeHandler}
                    placeholder = "Enter Last Name"
                    value={lastName}
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadowins'
                />
            </label>
        </div>
        {/* email address */}
            <label className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] w-full mt-[20px]'>
                <p>Email Address <sup className='text-pink-200'>*</sup></p>
                <input
                    required
                    type='email'
                    name='email'
                    onChange={changeHandler}
                    placeholder = "Enter Email Address"
                    value={email}
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                />
            </label>
        {/* phone number */}
        {/* <label className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] w-full'>
            <p className='mt-[20px]'>Phone number <sup className='text-pink-200'>*</sup></p>
            <div className='flex gap-x-4'>
                <div className='w-1/5 bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] shadowins'>

                </div>
                <input
                    required
                    type="tel"
                    id="phone"
                    name="phone-number" 
                    onChange={changeHandler}
                    placeholder='123-456-7890'
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadowins'
                />
            </div>
        </label> */}
        {/* password input */}
        <div className='flex gap-x-4 my-5'>
            <label className='w-full relative text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                <p>Create Password <sup className='text-pink-200'>*</sup></p>
                <input
                    required
                    type={showPassword? ('text') : ('password')}
                    name='password'
                    onChange={changeHandler}
                    placeholder = "Enter Password"
                    value={password}
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadowins'
                />
                <span className='absolute right-3 top-[35px] cursor-pointer' onClick={()=>setShowPassword((prev) => !prev)}>
                    {showPassword?(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2FB'/>):(<AiOutlineEye fontSize={24} fill='#AFB2FB'/>)}
                </span>
            </label>
            <label className='w-full relative text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                <p>Confirm Password <sup className='text-pink-200'>*</sup></p>
                <input
                    required
                    type={confPassword? ('text') : ('password')}
                    name='confirmPassword'
                    onChange={changeHandler}
                    placeholder = "Confirm Password"
                    value={confirmPassword}
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadowins'
                />
                <span className='absolute right-3 top-[35px] cursor-pointer' onClick={()=>setConfPassword((prev) => !prev)}>
                    {confPassword?(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2FB'/>):(<AiOutlineEye fontSize={24} fill='#AFB2FB'/>)}
                </span>
            </label>
        </div>
        <SubmitButton>
            Create Account
        </SubmitButton>
      </form>
    </div>
  )
}

export default SignupForm;
