import React,{ useState } from 'react'
import {MdOutlineDeleteForever} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { deleteAccount } from '../../../../services/operations/profileAPI';
import ConfirmationModal from '../../../Common/ConfirmationModal';

const DeleteAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmationModal, setConfirmationModal] = useState(null);
    const {token} = useSelector((state) => state.auth);

    const deleteHandler = (event) => {
        event.preventDefault();
        dispatch(deleteAccount(token,navigate));
    }

  return (
    <div className='flex bg-pink-900 rounded border border-pink-700 p-7 gap-x-5 mb-7 w-full'>
        <div>
            <div className='flex justify-center items-center rounded-full w-16 aspect-square bg-pink-700'>
                <MdOutlineDeleteForever size={40} className='text-pink-200'/>
            </div>
        </div>
        <div className='flex flex-col gap-2'>
            <h3 className='text-pink-5 text-xl font-bold'>Delete Account</h3>
            <div>
                <p className='text-pink-25 text-lg font-medium mb-1'>Would you like to delete account?</p>
                <p className='text-pink-25 text-lg font-medium lg:w-3/4'>This account contains Paid Courses. Deleting your account will remove all the content associated with it.</p>
            </div>
            <div onClick={() => setConfirmationModal({
                    text1 : "Your account will be deleted forever.",
                    text2 : "Are you sure ? This process is not reversible.",
                    btn1Text : "Delete",
                    btn2Text : "Cancel",
                    btn1Handler : deleteHandler,
                    btn2Handler : () => setConfirmationModal(null),
                })}
                
                className='text-pink-300 italic font-medium text-lg cursor-pointer' >
                I want to delete my account.
            </div>
        </div>

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}

        
      
    </div>
  )
}

export default DeleteAccount
