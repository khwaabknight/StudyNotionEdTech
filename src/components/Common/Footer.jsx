import React from 'react';
import { Link } from 'react-router-dom';
import {BsHeartFill} from "react-icons/bs";
import {AiOutlineCopyright} from "react-icons/ai";
import StudyNotionWhiteLogo from "../../assets/Logo/Logo-Full-Light.png";
import FacebookLogo from "../../assets/SocialMediaLogos/Facebook.svg";
import GoogleLogo from "../../assets/SocialMediaLogos/Google.svg";
import TwitterLogo from "../../assets/SocialMediaLogos/Twitter.svg";
import YoutubeLogo from "../../assets/SocialMediaLogos/Youtube.svg";
import {FooterLinks} from '../../data/footer-links';


// Links need update
const Footer = () => {
  return (
    <div className='flex w-screen justify-center items-center bg-richblack-800 px-32 py-12'>
        <div className='flex flex-col justify-center items-center gap-8  w-11/12  max-w-screen-2xl'>

            {/* Top part */}
            <div className='flex flex-row gap-14 w-full px-32'>
                {/* Left part */}
                <div className='flex flex-row gap-3 items-start font-inter font-medium text-sm text-richblack-400 w-full'>
                    {/* Logo and company section */}
                    <div className='flex flex-col gap-3 w-1/3'>
                        <div className='w-40'> <Link to={"/#"}> <img src={StudyNotionWhiteLogo} alt='Logo' className=' text-richblack-50'></img> </Link> </div>
                        <p className='font-inter font-semibold text-base text-richblack-100'>Company</p>
                        <div className='flex flex-col gap-2 items-stretch'>
                            <Link to={"/#"}>About</Link>
                            <Link to={"/#"}>Careers</Link>
                            <Link to={"/#"}>Affiliates</Link>
                        </div>
                        <div className='flex gap-3'>
                            <Link> <img src={FacebookLogo} alt='FacebookLogo'/> </Link>
                            <Link> <img src={GoogleLogo} alt='GoogleLogo'/> </Link>
                            <Link> <img src={TwitterLogo} alt='TwitterLogo'/> </Link>
                            <Link> <img src={YoutubeLogo} alt='YoutubeLogo'/> </Link>
                        </div>
                    </div>

                    {/* Resources and support section */}
                    <div className='flex flex-col gap-9 w-1/3'>
                        <div className='flex flex-col gap-2 items-stretch'>
                            <p className='font-inter font-semibold text-base text-richblack-100 mb-1'>Resources</p>
                            <Link to={"/#"}>Articles</Link>
                            <Link to={"/#"}>Blog</Link>
                            <Link to={"/#"}>Chart Sheet</Link>
                            <Link to={"/#"}>Code challenges</Link>
                            <Link to={"/#"}>Docs</Link>
                            <Link to={"/#"}>Projects</Link>
                            <Link to={"/#"}>Videos</Link>
                            <Link to={"/#"}>Workspaces</Link>
                        </div>
                        <div className='flex flex-col gap-3 items-stretch'>
                            <p className='font-inter font-semibold text-base text-richblack-100'>Support</p>
                            <Link to={"/#"}>Help Center</Link>
                        </div>
                    </div>

                    {/* Plans and community section */}
                    <div className='flex flex-col gap-9 w-1/3'>
                        <div className='flex flex-col gap-2 items-stretch'>
                            <p className='font-inter font-semibold text-base text-richblack-100 mb-1'>Plans</p>
                            <Link to={"/#"}>Paid memberships</Link>
                            <Link to={"/#"}>For students</Link>
                            <Link to={"/#"}>Business solutions</Link>
                        </div>
                        <div className='flex flex-col gap-2 items-stretch'>
                            <p className='font-inter font-semibold text-base text-richblack-100 mb-1'>Community</p>
                            <Link to={"/#"}>Forums</Link>
                            <Link to={"/#"}>Chapters</Link>
                            <Link to={"/#"}>Events</Link>
                        </div>
                    </div>
                </div>

                {/* vertical line divider */}
                <div className=' bg-richblack-700 w-[1px]'></div>

                {/* Right part */}
                <div className='flex flex-row gap-3 items-start font-inter font-medium text-sm text-richblack-400 w-full'>
                    {/* Subjects section */}
                    <div className='flex flex-col gap-2 w-1/3 items-stretch'>
                        <p className='font-inter font-semibold text-base text-richblack-100 mb-1'>Subjects</p>
                        {
                            FooterLinks[0].links.map( (element, index) => {
                                return (
                                    <Link to={element.link} key={index}>{element.title}</Link>
                                )
                            })   
                        }
                    </div>

                    {/* Languages section */}
                    <div className='flex flex-col gap-2 w-1/3 items-stretch'>
                        <p className='font-inter font-semibold text-base text-richblack-100 mb-1'>Languages</p>
                        {
                            FooterLinks[1].links.map( (element, index) => {
                                return (
                                    <Link to={element.link} key={index}>{element.title}</Link>
                                )
                            })   
                        }
                    </div>

                    {/* Career building section */}
                    <div className='flex flex-col gap-2 w-1/3 items-stretch'>
                        {
                            FooterLinks[2].links.map( (element, index) => {
                                return (
                                    <Link to={element.link} key={index}>{element.title}</Link>
                                )
                            })   
                        }
                    </div>
                </div>
            </div>

            {/* divider line */}
            <div className=' bg-richblack-700 h-[1px] w-full'></div>

            {/* Bottom part */}
            <div className=' flex justify-between font-inter font-medium text-sm text-richblack-400 w-10/12'>

                <div className='flex gap-2'>
                    <Link to={"/privacy-policy"}>Privacy Policy</Link>
                    <div className=' bg-richblack-700 w-[1px]'></div>
                    <Link to={"/cookie-policy"} >Cookie Policy</Link>
                    <div className=' bg-richblack-700 w-[1px]'></div>
                    <Link to={"/terms-and-conditions"} >Terms</Link>
                </div>

                <div className='flex gap-2 items-baseline'>
                    <p>Made with</p><BsHeartFill className=' text-pink-200 '/><p>CodeHelp</p><AiOutlineCopyright/><p>2023 StudyNotion</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Footer
