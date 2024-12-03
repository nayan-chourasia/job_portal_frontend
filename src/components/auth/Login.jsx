import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_BACKEND_API } from '@/utils/constants';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

function Login() {
  const [input, setInput] = useState({
    email:"",
    password:"",
    role:""

  })
  const {loading} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeInput=(e)=>{
    setInput({...input, [e.target.name]:e.target.value});
  }
  const submitHandler = async(e) =>{
    e.preventDefault();
    console.log('register data',input);
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_BACKEND_API}/login`,input,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      if(response.data.success){
        dispatch(setUser(response.data.user))
        // console.log("user data",response.data.user)
        navigate("/")
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      
    }finally{
      dispatch(setLoading(false));
    }
  }

  return (

    <div>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div 
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')"}}
          >
          </div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className='flex justify-center'>
          <h1 className="text-4xl font-bold text-gray-400">
            Get<span className=" text-green-500">Applied</span>
          </h1>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Login
            </h1>
            <div className="w-full flex-1 mt-8">

              <div className="mx-auto max-w-xs">
              <form onSubmit={submitHandler}>
                   
                    <div className="flex flex-col gap-3 mb-2">
                      <Label>Email</Label>
                      <Input type="email" 
                      name="email"
                      value={input.email}
                      onChange={changeInput}
                      placeholder="email" />
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
                          className="cursor-pointer"  />
                          <Label htmlFor="r2">Recruiter</Label>
                        </div>
                        
                      </RadioGroup>
                     
                    </div>
                    {
                      loading?(<Button className="w-full my-4"><Loader2 className='className="w-full" animate-pulse'/>Please wait</Button>):(<Button type="submit" className="w-full my-4"> Login</Button>)
                    }
                    
                    <span className="text-sm"> Don't have an an account?  <Link to="/signup" className="text-blue-400">SignUp</Link></span>
                  </form>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by templatana's
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>
                  and its
                  <a href="#" className="border-b border-gray-500 border-dotted">
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

export default Login;
