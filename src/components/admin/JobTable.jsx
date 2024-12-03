import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const JobTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.length > 0
      ? allAdminJobs.filter((job) => {
          if (!searchJobByText) {
            return true;
          }
          return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
        })
      : [];
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <Table>
        <TableCaption>A list of your recent posted jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length <= 0 ? (
            <span>No registered companies yet</span>
          ) : (
            filterJobs.map((job) => (
              <motion.tr
                key={job._id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <TableCell>{job.company.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      <div
                        className="flex justify-start items-center gap-3 cursor-pointer"
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                      >
                        <Edit2 />
                        <span>Edit</span>
                      </div>
                      <div
                        className="flex justify-start items-center gap-3 mt-2 cursor-pointer"
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobTable;
