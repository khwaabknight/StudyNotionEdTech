import React from 'react'
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import EditButton from '../../../Common/EditButton'


const MyProfile = () => {

    const {user} = useSelector((state) => state.profile)
    // const navigate = useNavigate();


  return (
    <div>
      <div className='p-6'>
        {/* Breadcrumbs here */}
        <h2 className='font-medium text-3xl text-richblack-5'>My Profile</h2>
      </div>

      
      <div className='ml-28 w-3/4'>
        
        {/* Section 1 */}
        <div className='bg-richblack-800 rounded border border-richblack-700 p-7 flex items-center justify-between gap-x-5 mb-7'>
          <div className='flex justify-start items-center gap-6'>
              <img src={user?.image} alt={`profile-${user?.firstName}`} className='aspect-square w-20 rounded-full object-cover'/>
              <div className='flex flex-col gap-1'>
                  <p className='font-semibold text-2xl text-richblack-5'>{user?.firstName + " " + user?.lastName}</p>
                  <p className='font-normal text-sm text-richblack-300'>{user?.email}</p>
              </div>
          </div>
          <EditButton text="Edit" target={'/dashboard/settings'}/>
        </div>

        {/* Section 2 */}
        <div className='bg-richblack-800 rounded border border-richblack-700 p-7 flex flex-col items-center justify-between gap-y-5 mb-7'>
          <div className='w-full flex justify-between items-center'>
            <p className='font-semibold text-2xl text-richblack-5' >About</p>
            <EditButton text="Edit" target={'/dashboard/settings'}/>
          </div>
          <p className={`${user?.additionalDetails?.about ? 'font-medium text-base text-richblack-100' : 'font-normal text-sm text-richblack-300' }`}>{user?.additionalDetails?.about ?? "Write Something about Yourself"}</p>
        </div>

        {/* Section 3 */}
        <div className='bg-richblack-800 rounded border border-richblack-700 p-7 flex flex-col items-center justify-between gap-y-5 mb-7'>
          <div className='w-full flex justify-between items-center'>
              <p className='font-semibold text-2xl text-richblack-5'>Personal Details</p>
              <EditButton text="Edit" target={'/dashboard/settings'}/>
          </div>
          <div className='grid grid-cols-2 w-full gap-y-5'>
            <div className='flex flex-col gap-1'>
              <p className='font-normal text-sm text-richblack-600'>First Name</p>
              <p className='font-medium text-sm text-richblack-5'>{user?.firstName}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='font-normal text-sm text-richblack-600'>Email</p>
              <p className='font-medium text-sm text-richblack-5'>{user?.email}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='font-normal text-sm text-richblack-600'>Gender</p>
              <p className='font-medium text-sm text-richblack-5'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='font-normal text-sm text-richblack-600'>Last Name</p>
              <p className='font-medium text-sm text-richblack-5'>{user?.lastName}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='font-normal text-sm text-richblack-600'>Phone Number</p>
              <p className='font-medium text-sm text-richblack-5'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='font-normal text-sm text-richblack-600'>Date of Birth</p>
              <p className='font-medium text-sm text-richblack-5'>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth" }</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MyProfile
