import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompanyTable from "./CompanyTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const AdminCompanies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
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
              placeholder="filter by name"
              className="w-fit"
            />
            <Button onClick={() => navigate("/admin/companies/companycreate")}>
              Add Company
            </Button>
          </div>
        </div>
        <div>
          <CompanyTable />
        </div>
      </div>
    </>
  );
};

export default AdminCompanies;
