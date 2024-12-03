import { setCompanies } from '@/redux/companySlice'
import { COMPANY_BACKEND_API } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
       const fetchCompanies = async() =>{
        try {
            const response = await axios.get(`${COMPANY_BACKEND_API}/getCompany`,{
                withCredentials:true
            })
            if(response.data.success){
                dispatch(setCompanies(response.data.companies))
            }
        } catch (error) {
            console.log(error);
        }
       }
       fetchCompanies();
    },[])
}

export default useGetAllCompanies