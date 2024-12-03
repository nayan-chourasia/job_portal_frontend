import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "../UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const[open, setOpen] = useState(false);
  const {user} = useSelector(store=>store.auth);
  return (
    <div>
      <Navbar />
      <div className="bg-white max-w-7xl mx-auto border-2 border-gray-200 my-5 p-8 rounded-2xl ">
        <div className="flex justify-between">
          <div className="flex gap-6 items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="profileImg"
              />
            </Avatar>
            <div>
              <h1 className="font-semibold text-lg">{user?.fullname}</h1>
              <p className="text-sm">
                {user?.Profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick={()=> setOpen(true)} variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex gap-3 my-2">
            <Contact />
            <span>{user?.phonenumber}</span>
          </div>
        </div>
        {/* skills */}
        <div>
          <h1 className="font-semibold text-lg mb-2">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="px-2 py-1 bg-black text-white rounded-lg"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        {/* resume */}
        <div className="grid w-full max-w-sm item-center my-4">
          <Label className="font-semibold text-lg">Resume</Label>
          {isResume ? (
            <a target="blank" href={user?.profile?.resume} className="text-blue-400 w-full hover:underline cursor-pointer">
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
        {/* application table */}
      </div>
        <div className="max-w-5xl mx-auto bg-white rounded-2xl">
          <h1 className="font-semibold text-lg">Applied jobs</h1>
          <AppliedJobTable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
