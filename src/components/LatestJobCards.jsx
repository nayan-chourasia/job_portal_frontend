import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

// const latestJobs = [1,2,3,4,5,6,7,8,9]
const LatestJobCards = ({job}) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
    <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>{job?.location}</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{job.title}</h1>
            <p className='text-sm text-gray-600'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700'} variant={'ghost'}>{job?.position} Position</Badge>
            <Badge className={'text-red-500'} variant={'ghost'}>{job?.jobType}</Badge>
            <Badge className={'text-purple-500'} variant={'ghost'}>{job?.salary}Lakh</Badge>
        </div>
    </div>
  )
}

export default LatestJobCards