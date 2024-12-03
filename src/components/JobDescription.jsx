import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useParams } from "react-router-dom";

import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_BACKEND_API, JOB_BACKEND_API } from "@/utils/constants";
import { toast } from "sonner";

const JobDescription = () => {
 
  
 
  const {singleJob} = useSelector(store=>store.job);
  const {user} = useSelector(store=>store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(application=>application.applicant==user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)
  const params = useParams();
  const jobId = params.id;
  const dispatch  = useDispatch();

  const applyJobHandler = async() => {
    try {
      const response = await axios.get(`${APPLICATION_BACKEND_API}/applyjob/${jobId}`,{
        withCredentials:true
    })
      console.log("applied job",response.data);
    if(response.data.success){
      setIsApplied(true)//update the local state
      const updatedSingleJob = {...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
      dispatch(setSingleJob(updatedSingleJob))//help for real time update of the applicants
      toast.success(response.data.message);
    }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      
    }
    
  }

  useEffect(()=>{
    const fetchSingleJobs = async() =>{
     try {
         const response = await axios.get(`${JOB_BACKEND_API}/getjobbyid/${jobId}`,{
             withCredentials:true
         })
         console.log("single job",response);
         if(response.data.success){
             dispatch(setSingleJob(response.data.job))
             setIsApplied(response.data.job.applications.some(application=>application.applicant==user?._id))//ensure the state is in sync with fetched data
         }
     } catch (error) {
         console.log(error);
     }
    }
    fetchSingleJobs();
 },[jobId,dispatch,user?._id])

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700"} variant={"ghost"}>
              {singleJob?.position} position
            </Badge>
            <Badge className={"text-red-500"} variant={"ghost"}>
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-purple-500"} variant={"ghost"}>
              {singleJob?.salary} Lakhs
            </Badge>
          </div>
        </div>

        <Button
        onClick={isApplied? null :applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-400"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply now"}
        </Button>
      </div>
      <h1 className="border-b border-b-gray-300 font-medium py-4 text-lg">Job Description</h1>
      <div className="my-4">
        <h1 className="font-bold my-1">Role:<span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
        <h1 className="font-bold my-1">Location:<span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
        <h1 className="font-bold my-1">Description:<span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
        <h1 className="font-bold my-1">Experience:<span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel}</span></h1>
        <h1 className="font-bold my-1">Salary:<span className="pl-4 font-normal text-gray-800">{singleJob?.salary}LPA</span></h1>
        <h1 className="font-bold my-1">Total Applicants:<span className="pl-4 font-normal text-gray-800">{singleJob?.applications.length}</span></h1>
        <h1 className="font-bold my-1">Posted Date:<span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split('T')[0]}</span></h1>
      </div>
    </div>
  );
};

export default JobDescription;
