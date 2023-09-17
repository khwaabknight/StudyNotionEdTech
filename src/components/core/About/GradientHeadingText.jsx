import React from 'react'
import GradientText from './GradientText'

const GradientHeadingText = ({heading,gradient,children,headingStyle}) => {
  return (
    <div>
      <GradientText text={heading} gradient={gradient} textStyle={headingStyle}/>
      {children}
    </div>
  )
}

export default GradientHeadingText
