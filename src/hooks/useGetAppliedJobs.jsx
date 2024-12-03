import axios from 'axios';
import { APPLICATION_BACKEND_API } from "@/utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from '@/redux/jobSlice';

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await axios.get(`${APPLICATION_BACKEND_API}getappliedjob`, {
                    withCredentials: true
                });
                if(response.data.success){
                    dispatch(setAllAppliedJobs(response.data.application))
                }
            } catch (error) {
                console.error("Failed to fetch applied jobs", error);
            }
        };

        fetchAppliedJobs();
    }, []);
};

export default useGetAppliedJobs;