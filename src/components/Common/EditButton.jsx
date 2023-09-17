import React from 'react'
import {FiEdit} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const EditButton = ({target,text}) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => {navigate(target)}} className='flex justify-center items-center gap-2 py-2 px-5 rounded-md bg-yellow-50 text-richblack-900'>
        <FiEdit size={18}/>
        <p className='font-medium text-base '>{text}</p>
    </button>
  )
}

export default EditButton
