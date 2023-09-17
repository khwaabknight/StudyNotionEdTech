import React from 'react';

const HighLightText = ({text}) => {
  return (
    <span className='font-bold bg-clip-text text-transparent bg-gradient-to-br from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb]'>
      {" "}{text}
    </span>
  )
}

// background: linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%),
// linear-gradient(0deg, #F1F2FF, #F1F2FF);

export default HighLightText;
