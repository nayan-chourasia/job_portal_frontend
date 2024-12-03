import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicationTable from './ApplicationTable'
import axios from 'axios'
import { APPLICATION_BACKEND_API } from '@/utils/constants'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {applicants} = useSelector(store=>store.application)
  useEffect(()=>{
    const fetchApplicants =async() =>{
      try {
        const response = await axios.get(`${APPLICATION_BACKEND_API}${params.id}/getapplicants`,{withCredentials:true})
        console.log(response.data);
        if(response.data.success){
          dispatch(setAllApplicants(response.data.job))
          
        }
        
      } catch (error) {
        console.log(error);
      }

    }
    fetchApplicants();
    
  },[])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10'>
            <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.applications?.length})</h1>
            <ApplicationTable/>
        </div>
    </div>
  )
}

export default Applicants