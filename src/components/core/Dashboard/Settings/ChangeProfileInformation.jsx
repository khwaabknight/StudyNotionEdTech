import React,{useEffect, useState} from 'react'
import CountryCode from '../../../../data/CountryCodes.json'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../../../services/operations/profileAPI'
import SubmitButton from '../../../Common/SubmitButton'
import IconBtn from '../../../Common/IconBtn'

const ChangeProfileInformation = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.profile)
  const {token} = useSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    dateOfBirth: user?.additionalDetails?.dateOfBirth ?? '1999-01-01',
    countryCode: user?.additionalDetails?.countryCode ?? '+91',
    contactNumber: user?.additionalDetails?.contactNumber ?? '',
    gender: user?.additionalDetails?.gender ?? 'Male',
    about: user?.additionalDetails?.about ?? '',
  });

  const {firstName,lastName,dateOfBirth,countryCode,contactNumber,gender,about} = formData;

  function changeHandler(event) {
    setFormData( (prevData) => ({
        ...prevData,
        [event.target.name] : event.target.value
    }))
  }

  const handleOnSubmit = async(event) => {
    event.preventDefault();
    dispatch (updateProfile(token,{firstName,lastName,dateOfBirth,countryCode,contactNumber,gender,about}));
  }

  const cancelHandler = (event) => {
    event.preventDefault();
    setFormData({
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth ?? '1999-01-01',
      countryCode: user?.additionalDetails?.countryCode ?? '+91',
      contactNumber: user?.additionalDetails?.contactNumber ?? '',
      gender: user?.additionalDetails?.gender ?? 'Male',
      about: user?.additionalDetails?.about ?? '',
    })
  }

  return (
    <div className='bg-richblack-800 rounded border border-richblack-700 p-7 flex flex-col items- justify-start gap-x-5 mb-7 w-full gap-y-5'>
      <h2 className='font-semibold text-lg text-richblack-5'>Profile Information</h2>
      <form onSubmit={handleOnSubmit}>
        <div  className='grid grid-cols-2 gap-x-6 gap-y-5 mb-5'>
        {/* First Name */}
          <div className='flex flex-col gap-y-1.5'>
            <h6 className='font-normal text-base text-richblack-5'>First Name</h6>
            <input
            type='text'
            name='firstName'
            onChange={changeHandler}
            placeholder='First Name' 
            value={firstName}
            className='p-3 rounded-lg bg-richblack-700 shadowins'          
            />
            <p className='font-normal text-sm text-richblack-500'>Name entered above will be used for all issued certifies.</p>
          </div>

          {/* Last Name */}
          <div className='flex flex-col gap-y-1.5'>
            <h6 className='font-normal text-base text-richblack-5'>Last Name</h6>
            <input
            type='text'
            name='lastName'
            onChange={changeHandler}
            placeholder='Last Name'
            value={lastName}
            className='p-3 rounded-lg bg-richblack-700 shadowins'  
            />
            <p className='font-normal text-sm text-richblack-500'>Name entered above will be used for all issued certifies.</p>
          </div>

          {/* Date of birth */}
          <div className='flex flex-col gap-y-1.5'>
            <h6 className='font-normal text-base text-richblack-5'>Date of Birth</h6>
            <input
            type='date' 
            name='dateOfBirth'
            onChange={changeHandler}
            value={dateOfBirth}
            className='p-3 rounded-lg bg-richblack-700 shadowins date-input'/>
          </div>

          {/* Phone number */}
          <div className='flex flex-col gap-y-1.5'>
            <h6 className='font-normal text-base text-richblack-5'>Phone Number</h6>
            <div className='flex flex-row gap-5 w-full'>
                  {/* dropdown */}
                  <select
                  name='drowdown'
                  id='dropdown'
                  onChange={changeHandler}
                  value={countryCode}
                  className='text-base text-richblack-200 font-medium p-3 rounded-lg bg-richblack-700 shadowins w-1/5'
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
                      name='contactNumber'
                      onChange={changeHandler}
                      value={contactNumber}
                      id='contactNumber'
                      placeholder='12345 67890'
                      className='text-base text-richblack-200 font-medium p-3 rounded-lg bg-richblack-700 shadowins w-4/5'                    
                  />

            </div>
          </div>

          {/* Gender */}
          <div className='flex flex-col gap-y-1.5'>
            <h6 className='font-normal text-base text-richblack-5'>Gender</h6>
            <div className='grid grid-cols-3 py-3 px-5 rounded-lg bg-richblack-700 shadowins'>       
              <div className='flex gap-x-3 items-center justify-start'>
                <input type='radio' id="Male" name="gender" value="Male" className='appearance-none bg-transparent m-0 font-inter text-richblack-500 w-5 h-5 border-[0.25rem] rounded-full checked:text-yellow-50 checked:before:scale-100 before:w-[0.625rem] before:h-[0.625rem] before:content-[""] before:block before:rounded-full before:bg-yellow-50 before:translate-x-[16%] before:translate-y-[16%] before:scale-0 transition-all duration-200' checked={gender === 'Male' && true} onChange={changeHandler}/>
                <label htmlFor='Male' className='font-medium text-base text-richblack-200'>Male</label>
              </div>
              <div className='flex gap-x-3 items-center justify-start'>
                <input type='radio' id="Female" name="gender" value="Female" className='appearance-none bg-transparent m-0 font-inter text-richblack-500 w-5 h-5 border-[0.25rem] rounded-full checked:text-yellow-50 checked:before:scale-100 before:w-[0.625rem] before:h-[0.625rem] before:content-[""] before:block before:rounded-full before:bg-yellow-50 before:translate-x-[16%] before:translate-y-[16%] before:scale-0 transition-all duration-200' checked={gender === 'Female' && true} onChange={changeHandler}/>
                <label htmlFor='Female' className='font-medium text-base text-richblack-200'>Female</label>
              </div>
              <div className='flex gap-x-3 items-center justify-start'>
                <input type='radio' id="Other" name="gender" value="Other" className='appearance-none bg-transparent m-0 font-inter text-richblack-500 w-5 h-5 border-[0.25rem] rounded-full checked:text-yellow-50 checked:before:scale-100 before:w-[0.625rem] before:h-[0.625rem] before:content-[""] before:block before:rounded-full before:bg-yellow-50 before:translate-x-[16%] before:translate-y-[16%] before:scale-0 transition-all duration-200' checked={gender === 'Other' && true} onChange={changeHandler}/>
                <label htmlFor='Other' className='font-medium text-base text-richblack-200'>Other</label>
              </div>
            </div>
          </div>
          
          {/* About */}
          <div className='flex flex-col gap-y-1.5'>
            <h6 className='font-normal text-base text-richblack-5'>About</h6>
            <input 
            type='text'
            name='about'
            placeholder='Enter Bio Details' 
            className='p-3 rounded-lg bg-richblack-700 shadowins'
            onChange={changeHandler}
            value={about}
            />
          </div>
        </div>

        <div className='flex gap-x-5 justify-end'>
          <IconBtn
            text='Cancel'
            onclick={cancelHandler}
            customClasses='bg-richblack-200 rounded-md text-base font-semibold text-richblack-900 px-7 py-2 shadowins'
          />
          <SubmitButton><p className='flex justify-center items-center gap-2'>Save</p></SubmitButton>
        </div>
        
      </form>
    </div>
  )
}

export default ChangeProfileInformation
