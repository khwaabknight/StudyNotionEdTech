import React, {useCallback, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineEye , AiOutlineEyeInvisible } from 'react-icons/ai';
import SubmitButton from '../components/Common/SubmitButton';
import { BsArrowLeft } from 'react-icons/bs';
import { HiCheckCircle,HiXCircle } from 'react-icons/hi';
import { CHARACTERS } from '../utils/constants';


const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {loading} = useSelector((state) => state.auth)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [strongPasswordcharacters, setStrongPasswordcharacters] = useState({
        lowercase:false,
        special:false,
        uppercase:false,
        length:0,
        number:false,
    });
    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:"",
    })
    const {password,confirmPassword} = formData;
    const {lowercase,special,uppercase,length,number} = strongPasswordcharacters;

    const {LOWERCASE,UPPERCASE,NUMBER,SPECIALCHARACTERS} = CHARACTERS;

    const checkStrongPassword = useCallback(() => {
        const strg = password;
        const arr = [false,false,false,strg.length,false]
        for(let char of strg){
            if(LOWERCASE.includes(char)) arr[0] = true
            if(SPECIALCHARACTERS.includes(char)) arr[1] = true
            if(UPPERCASE.includes(char)) arr[2] = true
            if(NUMBER.includes(char)) arr[4] = true
        }
        setStrongPasswordcharacters({
            lowercase:arr[0],
            special:arr[1],
            uppercase:arr[2],
            length:arr[3],
            number:arr[4],
        })
    },[password,LOWERCASE,UPPERCASE,NUMBER,SPECIALCHARACTERS])

    useEffect(() => {
        if(checkStrongPassword)
            checkStrongPassword();        
    },[password,checkStrongPassword]);


    const handleOnChange = (e) => {
        
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name] : e.target.value
            }
        ))
    }

    


    const handleOnSubmit = (e) => {
        e.preventDefault();
        
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token,strongPasswordcharacters,navigate))
    }

  return (
    <div className='text-white w-[500px] m-auto p-10'>
      {
        loading ? (
            <div className='flex flex-col justify-center items-center'>
                <div className='mx-auto mb-20 spinner'/>
                <p className=' text-richblack-200 font-medium text-lg'>Changing Password...</p>
            </div>    
        ) : (
            <div className='mb-20'>
                <h2 className='font-semibold text-3xl text-richblack-5'>Choose new Password</h2>
                <p className='text-richblack-100 text-lg font-normal mt-3'>Almost done. Enter your new password and you're all set.</p>
                <form onSubmit={handleOnSubmit}  className='flex flex-col gap-3 mt-9'>
                    <label className='flex flex-col gap-1.5 text-richblack-5 relative'>
                        <p className='text-sm font-normal'>New Password <sup className=' text-pink-200'>*</sup></p>
                        <input
                            required
                            type={showPassword ? "text" : 'password'}
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                            placeholder='New password'
                            className='p-3 text-base font-medium bg-richblack-800 rounded-lg shadowins'
                        />
                        <span onClick={() => setShowPassword((prev) => !prev)} className='absolute right-3 top-[38px] z-10 cursor-pointer'>
                            {
                                showPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24}/>
                            }
                        </span>
                    </label>

                    <label className='flex flex-col gap-1.5 text-richblack-5 relative'>
                        <p className='text-sm font-normal'>Confirm Password <sup className=' text-pink-200'>*</sup></p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : 'password'}
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder='Confirm password'
                            className='p-3 text-base font-medium bg-richblack-800 rounded-lg shadowins'
                        />
                        <span onClick={() => setShowConfirmPassword((prev) => !prev)} className='absolute right-3 top-[38px] z-10 cursor-pointer'>
                            {
                                showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24}/>
                            }
                        </span>
                    </label>

                    <div className='grid grid-cols-2'>
                        <div className={`flex justify-start items-center gap-1.5 font-normal text-xs ${lowercase?"text-caribbeangreen-300":"text-pink-400"} transition-all duration-200`}>
                            {lowercase?<HiCheckCircle/>:<HiXCircle/>}
                            <p>one lowercase character</p>
                        </div>
                        <div className={`flex justify-start items-center gap-1.5 font-normal text-xs ${special?"text-caribbeangreen-300":"text-pink-400"} transition-all duration-200`}>
                            {special?<HiCheckCircle/>:<HiXCircle/>}
                            <p>one special character</p>                            
                        </div>
                        <div className={`flex justify-start items-center gap-1.5 font-normal text-xs ${uppercase?"text-caribbeangreen-300":"text-pink-400"} transition-all duration-200`}>
                            {uppercase?<HiCheckCircle/>:<HiXCircle/>}
                            <p>one uppercase character</p>                            
                        </div>
                        <div className={`flex justify-start items-center gap-1.5 font-normal text-xs ${length>=8?"text-caribbeangreen-300":"text-pink-400"} transition-all duration-200`}>
                            {length>=8?<HiCheckCircle/>:<HiXCircle/>}
                            <p>8 character minimum</p>                            
                        </div>
                        <div className={`flex justify-start items-center gap-1.5 font-normal text-xs ${number?"text-caribbeangreen-300":"text-pink-400"} transition-all duration-200`}>
                            {number?<HiCheckCircle/>:<HiXCircle/>}
                            <p>one number</p>
                        </div>
                    </div>

                    <SubmitButton>
                        Reset Password
                    </SubmitButton>

                    <div className='flex place-items-center gap-2 text-base font-medium p-3'>
                        <BsArrowLeft/>
                        <Link to='/login'>
                            <p>Back to login</p>
                        </Link>
                    </div>

                </form>
            </div>
        )
      }
    </div>
  )
}

export default UpdatePassword
