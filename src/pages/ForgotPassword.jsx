import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SubmitButton from '../components/Common/SubmitButton'
import { Link } from 'react-router-dom'
import {getPasswordResetToken} from '../services/operations/authAPI'
import {BsArrowLeft} from 'react-icons/bs'
import Loader from '../components/Common/Loader'

const ForgotPassword = () => {
    const {loading} = useSelector((state) => state.auth)
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("")
    const dispatch = useDispatch();

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));

    }

  return (
    <div className='text-white w-[500px] m-auto p-10'>

        {
            loading ? (
                <Loader>Sending Password Reset Email...</Loader>
            ) : (
                <div className='mb-20'>
                    <h2 className='font-semibold text-3xl text-richblack-5'>
                        {
                            !emailSent ? "Reset your Password" : "Check your email"
                        }
                    </h2>

                    <p className='text-richblack-100 text-lg font-normal mt-3'> 
                        {
                            !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery": `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit } className={`flex flex-col gap-3 ${!emailSent && 'mt-9'}`}>
                        {
                            !emailSent && (
                                <label className='flex flex-col gap-1.5 text-richblack-5'>
                                    <p className='text-sm font-normal '>Email Address <sup className=' text-pink-200'>*</sup></p>
                                    <input 
                                        required
                                        type='email'
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Enter Your Email Address'
                                        className='p-3 text-base font-medium bg-richblack-800 rounded-lg shadowins'
                                    />
                                </label>
                            )
                        }
                        <SubmitButton>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </SubmitButton>
                    </form>

                    <div className='flex place-items-center gap-2 text-base font-medium p-3'>
                        <BsArrowLeft/>
                        <Link to='/login'>
                            <p>Back to login</p>
                        </Link>
                    </div>

                </div>
            )
        }
       
    </div>
  )
}

export default ForgotPassword
