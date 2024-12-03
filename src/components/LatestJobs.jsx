import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'


// const latestJobs = [1,2,3,4,5,6,7,8,9]
const LatestJobs = () => {
  const {allJobs} = useSelector(store=>store.job);

  return (
    <div className=' max-w-7xl mx-auto my-20 items-center'>
        <h1 className='text-4xl font-bold'>Latest & Top<span className='text-purple-500'> Job Openings</span></h1>
        <div className='grid grid-cols-3 my-5 gap-4'>
            {
                allJobs.length<=0?<span>
                  No Jobs Available
                </span> :allJobs?.slice(0,6).map((job)=><LatestJobCards key={job._id} job={job}/>)
            }
        </div>
    </div>
  )
}

export default LatestJobs