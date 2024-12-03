import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_BACKEND_API } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (CompanyId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
       const fetchSingleCompany = async() =>{
        try {
            const response = await axios.get(`${COMPANY_BACKEND_API}getCompanyById/${CompanyId}`,{
                withCredentials:true
            })
            if(response.data.success){
                dispatch(setSingleCompany(response.data.company))
            }
        } catch (error) {
            console.log(error);
        }
       }
       fetchSingleCompany();
    },[CompanyId, dispatch])
}

export default useGetCompanyById