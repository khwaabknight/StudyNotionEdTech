import React from 'react'
import { Link } from 'react-router-dom'

const NavButton = ({to,children}) => {
  return (
    <Link to={to}>
      <button className='border border-richblack-700 bg-richblack-800 text-richblack-100 px-3 py-2 rounded-md'>
        {children}
      </button>
    </Link>
  )
}

export default NavButton
