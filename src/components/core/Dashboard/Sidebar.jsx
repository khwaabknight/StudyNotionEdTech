import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import {logout} from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../Common/ConfirmationModal'
import Loader from '../../Common/Loader'

const Sidebar = () => {

    const {user, loading:profileLoading} = useSelector((state) => state.profile);
    const {loading:authLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if(profileLoading || authLoading) {
        return <Loader>Loading ...</Loader>
    }

  return (
    <div className='flex flex-col border-r-[1px] border-r-richblack-700 min-w-[240px] bg-richblack-800  h-[calc(100vh_-_3.5rem)]'>

        <div className='flex flex-col pt-10'>
        {
            sidebarLinks.map((link) => {
                if(link.type && user?.accountType !== link.type) return null;
                return (
                    <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                )
            })
        }
        </div>

        <div className='mx-auto my-6 h-[1px] w-5/6 bg-richblack-600' />

        <div className='flex flex-col'>
            <SidebarLink link={{name:"Settings",path:"dashboard/settings"}} iconName="VscSettingsGear"/>

            <button onClick={() => setConfirmationModal({
                    text1 : "Are You Sure ?",
                    text2 : "You will be logged out of your Account.",
                    btn1Text : "Log Out",
                    btn2Text : "Cancel",
                    btn1Handler : () => dispatch(logout(navigate)),
                    btn2Handler : () => setConfirmationModal(null),
                })}
                className='text-sm font-medium text-richblack-300 pl-8 py-2' >
                <div className='flex items-center gap-x-2'>
                    <VscSignOut className='text-lg' />
                    <span >Log Out</span>
                </div>
            </button>
        </div>

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
      
    </div>
  )
}

export default Sidebar
