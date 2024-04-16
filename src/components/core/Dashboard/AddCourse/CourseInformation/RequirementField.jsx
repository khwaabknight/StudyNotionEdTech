import React, { useState } from 'react'
import { useEffect } from 'react'

const RequirementField = ({name,label,register,errors,setValue,getValues,placeholder,initialValue}) => {

  const [requirementList, setRequirementList] = useState(initialValue)
  const [requirement, setRequirement] = useState("")

  useEffect(() => {
    register(name,{
      required:true,
      validate:(value) => value.length > 0
    })
  },[name,register])

  useEffect(() => {
    setValue(name,requirementList);
  },[requirementList,name,setValue])

  const handleAddRequirement = () => {
    if(requirement) {
      setRequirementList([...requirementList,requirement]);
      setRequirement("");
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index,1);
    setRequirementList(updatedRequirementList);
  }

  return (
    <div className='flex flex-col gap-1.5'>
      <label htmlFor={name} className='font-normal text-sm text-richblack-5'>{label} <sup className='text-pink-200'>*</sup></label>
      <div className='flex flex-col gap-y-1.5'>
        <input 
          type='text'
          id={name}
          value={requirement}
          placeholder={placeholder}
          onChange={(e) => setRequirement(e.target.value)}
          className='p-3 bg-richblack-700 rounded-lg shadowins text-richblack-200 text-base font-medium'
        />
        <button
          type='button'
          onClick={handleAddRequirement}
          className='font-semibold text-yellow-50 self-start'
        >
          Add
        </button>
        {
          requirementList.length > 0 && (
            <ul>
              {
                requirementList.map((requirement,index) => (
                  <li key={index} className='flex items-center text-richblack-5'>
                    <span>{requirement}</span>
                    <button
                      type='button'
                      onClick={() => handleRemoveRequirement(index)}
                      className='text-4xl text-pure-greys-300'
                    >
                      X
                    </button>
                  </li>
                ))
              }
            </ul>
          )
        }
        {
          errors.name && (
            <span className='text-pink-600 italic'>
              {label} is required
            </span>
          )
        }
      </div>
    </div>
  )
}

export default RequirementField
