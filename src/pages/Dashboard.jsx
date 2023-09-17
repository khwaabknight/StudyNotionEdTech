import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import Loader from '../components/Common/Loader';

const Dashboard = () => {

    const {loading:authLoading} = useSelector((state) => state.auth);
    const {loading:profileLoading} = useSelector((state) => state.profile);

    if(profileLoading || authLoading) {
        return <Loader>Loading ...</Loader>
    }

  return (
    <div className='relative flex min-h-[calc(100vh_-_3.5rem)] bg-richblack-900 text-richblack-5 font-inter w-screen '>
      <Sidebar/>
      <div className='h-[calc(100vh-3.5rem)] overflow-x-hidden w-full'>
        <div className='max-w-[1440px] overflow-x-hidden'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
