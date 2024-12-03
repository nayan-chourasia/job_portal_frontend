import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import JobTable from "./JobTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <>
      <div>
        <Navbar />
        <div className="max-w-6xl mx-auto my-10">
          <div className="flex justify-between items-center my-5">
            <Input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="filter by name, jobs"
              className="w-fit"
            />
            <Button onClick={() => navigate("/admin/jobs/jobcreate")}>
              Post Jobs
            </Button>
          </div>
        </div>
        <div>
          <JobTable />
        </div>
      </div>
    </>
  );
};

export default AdminJobs;
