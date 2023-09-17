import React from 'react'
import AuthTemplate from '../components/core/Auth/AuthTemplate'
import loginImg from '../assets/Images/login.webp'

const Login = () => {
  return (
    <AuthTemplate
      title=
      'Welcome Back'
      desc1="Build skills for today, tommorow and beyond."
      desc2="Education to future-proof your career."
      image={loginImg}
      formtype="login"
    />
  )
}

export default Login
