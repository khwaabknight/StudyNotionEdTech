import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import SubmitButton from '../../Common/SubmitButton'
import {contactusEndpoint} from '../../../services/apis'
import {apiConnector} from '../../../services/apiconnector'
import CountryCode from '../../../data/CountryCodes.json'

const ContactForm = () => {
    console.log(CountryCode);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSussessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Logging data", data);
        
        try {
            setLoading(true);
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API,data)
            console.log("Logging response",response)
            setLoading(false);
        } catch (error) {
            console.log("error", error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if(isSubmitSussessful) {
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:"",
            })
        }
    },[isSubmitSussessful,reset])
  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className='flex flex-col'>
        {/* Name */}
        <div className='flex gap-5'>
            {/* firstName */}
            <div className='flex flex-col gap-1.5 w-1/2'>
                <label htmlFor='firstName' className='font-normal text-sm text-richblack-5'>First Name </label>
                <input 
                    type='text'
                    name='firstName'
                    id='firstName'
                    placeholder='Enter first name'
                    {...register("firstName", {required:true})}
                    className='text-base text-richblack-200 font-medium p-3 rounded-lg bg-richblack-800 shadowins'
                />
                {
                    errors.firstName && (
                        <span>Please enter Your Name</span>
                    )
                }
            </div>
            {/* lastName */}
            <div className='flex flex-col gap-1.5 w-1/2'>
                <label htmlFor='lastName' className='font-normal text-sm text-richblack-5'>Last Name </label>
                <input 
                    type='text'
                    name='lastName'
                    id='lastName'
                    placeholder='Enter last name'
                    {...register("lastName")}
                    className='text-base text-richblack-200 font-medium p-3 rounded-lg bg-richblack-800 shadowins'
                />
            </div>
        </div>
        
        {/* email */}
        <div className='flex flex-col gap-1.5 mt-5'>
            <label htmlFor='email' className='font-normal text-sm text-richblack-5'>Email Address</label>
            <input 
                type='email'
                name='email'
                id='email'
                placeholder='Enter email Address'
                {...register("email",{required:true})}
                className='text-base text-richblack-200 font-medium p-3 rounded-lg bg-richblack-800 shadowins'
            />
            {
                errors.email && (
                    <span>Please enter your email address</span>
                )
            }
        </div>

        {/* Phone number */}
        <div className='flex flex-col gap-1.5 mt-5'>
            <label htmlFor='phoneNumber' className='font-normal text-sm text-richblack-5'>Phone Number</label>
            <div className='flex flex-row gap-5 w-full'>
                {/* dropdown */}
                <select
                name='drowdown'
                id='dropdown'
                defaultValue={'+91'}
                {...register("countrycode",{required:true})}
                className='text-base text-richblack-200 font-medium p-3 rounded-lg bg-richblack-800 shadowins w-1/5'
                >
                    {
                        CountryCode.map((element,index) => (
                            <option key={index} value={element.dial_code}>
                                {element.dial_code} - {element.name}
                            </option>
                        ))
                    }
                </select>

                {/* number */}
                <input
                    type='tel'
                    name='phoneNumber'
                    id='phoneNumber'
                    placeholder='12345 67890'
                    className='text-base text-richblack-200 font-medium p-3 rounded-lg bg-richblack-800 shadowins w-4/5'
                    {...register("phoneNo",{
                        required:{value:true,message:"Please enter Phone number"},
                        maxLength:{value:10,message:"Invalid phone number"},
                        minLength:{value:8,message:"Invalid Phone number"}, })}
                    
                />

            </div>
            {
                errors.phoneNo && (<span>{errors.phoneNo.message}</span>)
            }

        </div>

        {/* Message */}
        <div className='flex flex-col gap-1.5 my-9'>
            <label htmlFor='message' className='font-normal text-sm text-richblack-5'>Message</label>
            <textarea 
                name='message'
                id='message'
                cols="30"
                rows='7'
                placeholder='Enter your message here'
                {...register("message", {required:true})}
                className='text-base text-richblack-200 font-medium p-3 rounded-lg bg-richblack-800 shadowins resize-none'
            />
            {
                errors.message && (
                    <span>Please enter your message.</span>
                )
            }
        </div>

        <SubmitButton>Send message</SubmitButton>

      </div>
      
    </form>
  )
}

export default ContactForm
