import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_BACKEND_API } from "@/utils/constants";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState(''); // Initialize with empty string
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName) {
      toast.error("Company name cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        `${COMPANY_BACKEND_API}registerCompany`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response?.data?.success) {
        dispatch(setSingleCompany(response.data.company));
        toast.success(response.data.message);
        const companyId = response?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error("Failed to register company. Please try again.");
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10">
        <h1 className="font-bold text-2xl">Your Company Name</h1>
        <p className="text-gray-500 mb-5">
          What would you like to give your company name? You can change this
          later.
        </p>
        <Label>Company Name</Label>
        <Input
          type="text"
          placeholder="GetApplied, Microsoft etc."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="my-2"
        />
        <div className="flex items-center gap-2 my-5">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
