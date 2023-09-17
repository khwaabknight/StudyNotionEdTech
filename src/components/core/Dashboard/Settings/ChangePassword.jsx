import React,{ useState} from 'react'
import { AiOutlineEye , AiOutlineEyeInvisible } from 'react-icons/ai';
import SubmitButton from '../../../Common/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../../services/operations/profileAPI';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../Common/IconBtn';

const ChangePassword = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        password:"",
        newPassword:"",
        confirmNewPassword:""
    });
    const {token} = useSelector((state) => state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {password, newPassword, confirmNewPassword } = formData

    function changeHandler(event) {
        setFormData( (prevData) => ({
            ...prevData,
            [event.target.name] : event.target.value
        }))
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        dispatch(changePassword(token,password, newPassword,confirmNewPassword,navigate));        
    }

    const cancelHandler = (event) => {
        event.preventDefault();
        setFormData({
            password:"",
            newPassword:"",
            confirmNewPassword:""
        })
      }
    
    
  return (
    <div className='bg-richblack-800 rounded border border-richblack-700 p-7 flex flex-col items- justify-start gap-x-5 mb-7 w-full gap-y-5'>
      <h2 className='font-semibold text-lg text-richblack-5'>Profile Information</h2>
        <form onSubmit={handleOnSubmit}>
            <div className='grid grid-cols-2 gap-y-5 gap-x-4 my-5'>
            
                {/* Current Password */}
                <label className='w-full relative text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    <p> Current Password <sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type={showCurrentPassword? ('text') : ('password')}
                        name='password'
                        onChange={changeHandler}
                        placeholder = "Enter Current Password"
                        value={password}
                        className='bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadowins'
                    />
                    <span className='absolute right-3 top-[35px] cursor-pointer' onClick={()=>setShowCurrentPassword((prev) => !prev)}>
                        {showCurrentPassword?(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2FB'/>):(<AiOutlineEye fontSize={24} fill='#AFB2FB'/>)}
                    </span>
                </label>

                <div />

                {/* New Password */}
                <label className='w-full relative text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    <p> New Password <sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type={showNewPassword? ('text') : ('password')}
                        name='newPassword'
                        onChange={changeHandler}
                        placeholder = "New Password"
                        value={newPassword}
                        className='bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadowins'
                    />
                    <span className='absolute right-3 top-[35px] cursor-pointer' onClick={()=>setShowNewPassword((prev) => !prev)}>
                        {showNewPassword?(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2FB'/>):(<AiOutlineEye fontSize={24} fill='#AFB2FB'/>)}
                    </span>
                </label>

                {/* Confirm Password */}
                <label className='w-full relative text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    <p> Confirm New Password <sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type={showConfirmPassword? ('text') : ('password')}
                        name='confirmNewPassword'
                        onChange={changeHandler}
                        placeholder = "Confirm New Password"
                        value={confirmNewPassword}
                        className='bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadowins'
                    />
                    <span className='absolute right-3 top-[35px] cursor-pointer' onClick={()=>setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword?(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2FB'/>):(<AiOutlineEye fontSize={24} fill='#AFB2FB'/>)}
                    </span>
                </label>
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

export default ChangePassword
