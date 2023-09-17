import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({children, active, linkto}) => {
  return (
    <div>
      <Link to={linkto}>
        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold ${active ? "bg-yellow-50 text-black shadowyellow" : "bg-richblack-800 shadowblack" } hover:scale-95 transition-all duration-200 `}>{children}</div>
        {/* box-shadow: -2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset; */}
      </Link>
    </div>
  )
}

export default Button;
