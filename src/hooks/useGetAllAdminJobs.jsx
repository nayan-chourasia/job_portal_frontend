import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_BACKEND_API } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
       const fetchAllAdminJobs = async() =>{
        try {
            const response = await axios.get(`${JOB_BACKEND_API}getadminjob`,{
                withCredentials:true
            })
            if(response.data.success){
                dispatch(setAllAdminJobs(response.data.jobs))
            }
        } catch (error) {
            console.log(error);
        }
       }
       fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs