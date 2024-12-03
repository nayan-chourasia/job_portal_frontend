import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_BACKEND_API } from "@/utils/constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function SignUp() {
  const [input, setInput] = useState({
    fullname:"",
    email:"",
    phonenumber:"",
    password:"",
    role:"",
    file:null
  })
  const {loading} = useSelector(store=>store.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeInput=(e)=>{
    setInput({...input, [e.target.name]:e.target.value});
  }
  const changeFile= (e) => {
    setInput({ ...input, file: e.target.files?.[0] }); 
  }

  const submitHandler = async(e) =>{
    e.preventDefault();
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phonenumber",input.phonenumber);
    formData.append("password",input.password);
    formData.append("role",input.role);
    if(input.file){
      formData.append("file",input.file);
    }
    console.log('register data',input);
    try {
      const response = await axios.post(`${USER_BACKEND_API}/register`, formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      })
      if(response.data.success){
        navigate("/login")
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      
    }finally{
      dispatch(setLoading(false));
    }
  }
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
              }}
            ></div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex justify-center">
              <h1 className="text-4xl font-bold text-gray-400">
                Get<span className=" text-green-500">Applied</span>
              </h1>
            </div>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <form onSubmit={submitHandler}>
                    <div className="flex flex-col gap-3 mb-2">
                      <Label>Full Name</Label>
                      <Input type="text" 
                      name="fullname"
                      value={input.fullname}
                      onChange={changeInput}
                      placeholder="Username" />
                    </div>
                    <div className="flex flex-col gap-3 mb-2">
                      <Label>Email</Label>
                      <Input type="email"
                      name="email"
                      value={input.email}
                      onChange={changeInput}
                       placeholder="email" />
                    </div>
                    <div className="flex flex-col gap-3 mb-2">
                      <Label>Phone</Label>
                      <Input type="number" 
                      name="phonenumber"
                      value={input.phonenumber}
                      onChange={changeInput}
                      placeholder="phone number" />
                    </div>
                    <div className="flex flex-col gap-3 mb-2">
                      <Label>Password</Label>
                      <Input type="password"
                      name="password"
                      value={input.password}
                      onChange={changeInput}
                       placeholder="password" />
                    </div>
                    <div>
                    <div className="flex items-center justify-center gap-2 my-5">
                        <Label>Profile</Label>
                        <Input
                        accept="image/*"
                        type="file"
                        
                      
                      onChange={changeFile}
                        className="cursor-pointer"/>
                      </div>
                      <RadioGroup className="flex gap-3 my-6 items-center justify-center">
                        <div className="flex flex-row items-center space-x-2">
                          <Input
                          type="radio"
                          name="role"
                          value="student"
                          checked = {input.role ==='student'}
                          onChange={changeInput}
                          className="cursor-pointer" />
                          <Label htmlFor="r1">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <Input
                          type="radio"
                          name="role"
                          value="recruiter"
                          checked = {input.role ==='recruiter'}
                          onChange={changeInput}
                          className=" cursor-pointer" />
                          <Label htmlFor="r2">Recruiter</Label>
                        </div>
                        
                      </RadioGroup>
                     
                    </div>
                    {
                      loading?(<Button className="w-full my-4"><Loader2 className='className="w-full" animate-pulse'/>Please wait</Button>):(<Button type="submit" className="w-full my-4"> Login</Button>)
                    }
                    <span className="text-sm">Already have an account?  <Link to="/login" className="text-blue-400"> Login</Link></span>
                  </form>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by templatana's
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>
                    and its
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
