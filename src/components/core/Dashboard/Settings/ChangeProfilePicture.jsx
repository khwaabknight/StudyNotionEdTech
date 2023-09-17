import React, { useState, useEffect } from 'react'
import SubmitButton from '../../../Common/SubmitButton'
import {PiUploadSimple} from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import {updateDisplayPicture} from '../../../../services/operations/profileAPI'

const ChangeProfilePicture = () => {
    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const dispatch = useDispatch();
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)



    const handleFileChange = (e) => {
        const file = e.target.files[0]; 
        console.log(file)       
        if(file) {
            setImageFile(file);           
            previewFile(file);
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const handleFileUpload = () => {
        
        try {
            console.log('Uploading ...')
            const formData = new FormData()
            console.log(imageFile)
            formData.append("displayPicture", imageFile)
            console.log("formdata", formData)

            dispatch(updateDisplayPicture(token, formData))
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
        
    }

    useEffect(() => {
        if (imageFile) {
          previewFile(imageFile)
        }
    }, [imageFile])


  return (
    <div className='bg-richblack-800 rounded border border-richblack-700 p-7 flex items-center justify-start gap-x-5 mb-7 w-full'>
        <img src={previewSource ?? user?.image} alt={`profile-${user?.firstName}`} 
        className='aspect-square w-24 rounded-full object-cover'/>
        <div className='flex flex-col gap-y-3'>
            <p className='font-medium text-base text-richblack-25'> Change Profile Picture</p>
            <div className='flex justify-center items-center gap-3'>
                <input type='file' id='image' name='image' onChange={handleFileChange} accept='image/png,image/gif,image/jpeg,image/jpg' className='custom-file-input'/>
                <SubmitButton>
                    <div className='flex justify-center items-center gap-2' onClick={handleFileUpload}>
                        <p className='text-base font-semibold text-richblack-900'>Upload</p>
                        <PiUploadSimple size={25}/>
                    </div>
                </SubmitButton>
            </div>
        </div>
    </div>
  )
}

export default ChangeProfilePicture
