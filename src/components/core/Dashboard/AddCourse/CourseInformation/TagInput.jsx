import React,{ useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { MdClose } from "react-icons/md"

function TagInput({label,name,placeholder,register,errors,setValue,getValues}){
    const { editCourse, course } = useSelector((state) => state.course)

  // Setting up state for managing chips array
  const [chips, setChips] = useState([])

  useEffect(() => {
    if (editCourse) {
      setChips(course?.tag || [])
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
  }, [course?.tag, editCourse, register, name])

  useEffect(() => {
    setValue(name, chips)
  }, [chips,name,setValue])

  // Function to handle user input when chips are added
  const handleKeyDown = (event) => {
    // Check if user presses "Enter" or ","
    if (event.key === "Enter" || event.key === ",") {
      // Prevent the default behavior of the event
      event.preventDefault()
      // Get the input value and remove any leading/trailing spaces
      const chipValue = event.target.value.trim()
      // Check if the input value exists and is not already in the chips array
      if (chipValue && !chips.includes(chipValue)) {
        // Add the chip to the array and clear the input
        const newChips = [...chips, chipValue]
        setChips(newChips)
        event.target.value = ""
      }
    }
  }

  // Function to handle deletion of a chip
  const handleDeleteChip = (chipIndex) => {
    // Filter the chips array to remove the chip with the given index
    const newChips = chips.filter((_, index) => index !== chipIndex)
    setChips(newChips)
  }

  return (
    <div className='flex flex-col gap-1.5'>
      {/* Render the label for the input */}
      <label  className='font-normal text-sm text-richblack-5' htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      {/* Render the chips and input */}
      <div className="flex flex-col gap-y-2">
        {/* Map over the chips array and render each chip */}
        <div>
          {
            chips.map((chip, index) => (
              <span
                key={index}
                className="m-1 rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
              >
                {/* Render the chip value */}
                {chip}
                {/* Render the button to delete the chip */}
                <button
                  type="button"
                  className="ml-2 focus:outline-none"
                  onClick={() => handleDeleteChip(index)}
                >
                  <MdClose className="text-sm" />
                </button>
              </span>
            ))
          }
        </div>
        {/* Render the input for adding new chips */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className='p-3 bg-richblack-700 rounded-lg shadowins text-richblack-200 text-base font-medium'
        />
      </div>
      {/* Render an error message if the input is required and not filled */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}

export default TagInput
