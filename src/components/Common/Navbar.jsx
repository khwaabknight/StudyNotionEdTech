import React, {useState, useEffect } from 'react'
import { Link,matchPath } from 'react-router-dom';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector';
import { courseEndpoints } from '../../services/apis';
import {IoIosArrowDropdownCircle} from 'react-icons/io';
import NavButton from './NavButton';


const {COURSE_CATEGORIES_API} = courseEndpoints;

// const subLinks = [
//   {
//     title:"python",
//     link:"/catalog/python"
//   },
//   {
//     title:"web dev",
//     link:"/catalog/web-dev"
//   }
// ]

const Navbar = () => {

  const {token} = useSelector( (state) => state.auth);
  const {user} = useSelector( (state) => state.profile);
  const {totalItems} = useSelector( (state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSublinks = async () => {
    setLoading(true)
    try {
      const result = await apiConnector("GET",COURSE_CATEGORIES_API);
      console.log("Printing Sublinks result", result);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("Error in fetch sublinks",error);
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchSublinks();
  },[])

  const matchRoute = (route) => {
    return matchPath({path:route},location.pathname);
  }


  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-700 bg-richblack-800'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
      {/* logo */}
        <Link to={NavbarLinks[0]?.path}>
          <img src={logo} alt='' className='w-40 h-8' loading='lazy'/>
        </Link>

        {/* nav links */}
        <nav>
          <ul className='flex gap-x-6 text-richblack-25'>
            {
              NavbarLinks.map((singleLink, index) => (
                <li key={index}>
                  {
                    singleLink.title === "Catalog" ? (
                      <div className='relative flex items-center gap-2 group z-10'>
                        <p>Catalog</p>
                        <IoIosArrowDropdownCircle/>
                        <div className='invisible absolute left-[50%] top-[50%] -translate-x-1/2 translate-y-[30%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] '>

                          <div className='absolute left-[50%] translate-x-[80%] -translate-y-[45%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5'/>

                          {
                            subLinks.length > 0 ? (
                              subLinks?.map((subLink,index) => (
                                <Link to={subLink.link} key={index}>
                                  <p>{subLink.name}</p>
                                </Link>
                              ))
                            ) : (<div></div>)
                          }
                        </div>
                      </div>
                    ) : (
                      <Link to={singleLink?.path}>
                        <p className={`${matchRoute(singleLink?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                          {singleLink.title}
                        </p>
                      </Link>
                    )
                  }
                </li>
              ))
            }
          </ul>
        </nav>

        {/* Login / signup / Dashboard */}
        <div className='flex gap-x-4 items-center'>
          {
            user && user?.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" className='relative'>
                <AiOutlineShoppingCart/>
                {
                  totalItems > 0 && (
                    <span>
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
          }
          {
            token === null && (<NavButton to={"/login"}>Log in</NavButton>)
          }
          {
            token === null && (<NavButton to={"/signup"}>Sign Up</NavButton>)
          }
          {
            token !== null && <ProfileDropDown/>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar;
