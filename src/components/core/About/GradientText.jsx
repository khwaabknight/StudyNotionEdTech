import React from 'react'

const GradientText = ({gradient,text,textStyle}) => {
  return (
    <span className={`font-bold bg-clip-text text-transparent bg-gradient-to-br ${gradient} ${textStyle}`}>
      {" "}{text}
    </span>
  )
}

export default GradientText
