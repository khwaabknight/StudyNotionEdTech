import React from 'react'

const STATS = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
]

const StatsComponent = () => {
  return (
    <section className=' bg-richblack-800'>
        <div className='w-11/12 max-w-maxContent mx-auto py-20'>
            <div className='flex gap-5 justify-around items-center'>
                {
                    STATS.map((data,index) => {
                        return (
                            <div key={index} className='text-center gap-3 flex flex-col'>
                                <h2 className='text-richblack-5 font-bold text-3xl'>{data.count}</h2>
                                <h3 className='text-richblack-500 font-semibold text-base'>{data.label}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>      
    </section>
  )
}

export default StatsComponent
