import React from 'react';
import signupImg from '../assets/Images/signup.webp';
import AuthTemplate from '../components/core/Auth/AuthTemplate';
const Signup = () => {
  return (
    <div>
      <AuthTemplate
      title=
      'Join the millions learning to code with StudyNotion for free'
      desc1="Build skills for today, tommorow and beyond."
      desc2="Education to future-proof your career."
      image={signupImg}
      formtype="signup"
    />
    </div>
  )
}

export default Signup
