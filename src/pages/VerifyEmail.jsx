import React,{useEffect, useState} from 'react'
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import SubmitButton from '../components/Common/SubmitButton';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {BsArrowLeft} from 'react-icons/bs'
import {RxCounterClockwiseClock} from 'react-icons/rx'
import Loader from '../components/Common/Loader';

const VerifyEmail = () => {
    const {loading ,signupData} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if(!signupData) {
            navigate('/signup');
        }
    },[navigate,signupData])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {accountType,firstName,lastName,email,password,confirmPassword} = signupData;
        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));
    }


  return (
    <div className='text-white w-[500px] m-auto p-10'>
        {
            loading ? (
                <Loader>Sending Data...</Loader>

            ) : (
                <div className='mb-20'>
                    <h2 className='font-semibold text-3xl text-richblack-5'>Verify Email</h2>
                    <p className='text-richblack-100 text-lg font-normal mt-3'>A verification code hase been sent to you. Enter the code below</p>
                    <form onSubmit={handleOnSubmit} className='flex flex-col gap-3 mt-9'>
                        <div >
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => (<input 
                                {...props} 
                                placeholder='-'
                                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",}}
                                className='w-12 lg:w-14 border-0 bg-richblack-800 text-richblack-5 rounded-lg aspect-square text-center focus:outline-2 focus:outline-yellow-50'
                            />)}
                            containerStyle={{
                                justifyContent:'space-between',
                                gap: '0 6px',
                            }}
                        />
                        </div>
                        <SubmitButton>
                            Verify Email
                        </SubmitButton>
                    </form>

                    <div className='flex justify-between'>
                        <div className='flex place-items-center gap-2 text-base font-medium p-3'>
                            <BsArrowLeft/>
                            <Link to='/login'>
                                <p>Back to login</p>
                            </Link>
                        </div>
                        <button onClick={() => dispatch(sendOtp(signupData.email,navigate))} className='flex place-items-center gap-2 text-base font-thin p-3 text-blue-100'>
                            <RxCounterClockwiseClock/>
                            <p>Resend it</p>
                        </button>
                    </div>
                </div>
            )
        }
      
    </div>
  )
}

export default VerifyEmail
