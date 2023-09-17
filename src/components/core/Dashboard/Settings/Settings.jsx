import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import ChangeProfileInformation from './ChangeProfileInformation'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'



const Settings = () => {
  

  return (
    <div >

      <div className='p-6'>
        {/* Breadcrumbs here */}
        <h2 className='font-medium text-3xl text-richblack-5'>Edit Profile</h2>
      </div>

      

      <div className='ml-28 w-3/4'>
        {/* Edit image section */}
        <ChangeProfilePicture/>
        {/* Edit Profile information section */}
        <ChangeProfileInformation/>
        {/* Change password section */}
        <ChangePassword/>
        {/* Delete Account section*/}
        <DeleteAccount />
      </div>

    </div>      
  )
}

export default Settings
