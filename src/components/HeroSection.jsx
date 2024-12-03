import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () =>{
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }
  return (
    <div className='text-center mt-4'>
    <div className='flex flex-col gap-8 '>
      <span className='mx-auto bg-gray-200 px-4 py-2 text-red-500 text-xl rounded-full'>Go get your job</span>
      <h1 className='text-5xl font-bold'>Search, Apply & <br/> Get Your <span className='text-purple-500'>Dream Job</span></h1>
      <p className='lg:p-10 font-normal lg:text-lg'>
      A job portal app connects job seekers with employers, enabling job search, profile creation, and application tracking. Employers post jobs and manage applications, with advanced features like AI recommendations and interview scheduling.</p>
      <div className='flex items-center justify-center mx-auto rounded-full'>
        <Input
        type="text"
        placeholder="Find your dream job"
        onChange={(e)=>setQuery(e.target.value)}
        className="rounded-l-full p-4" />
        <Button onClick={searchJobHandler} className="px-3 py-2 mx-2 my-2 rounded-r-full"><Search/></Button>
      </div>
      </div>
    </div>
  )
}

export default HeroSection