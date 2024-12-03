import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType:"Location",
        array:["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer", "Backend Developer", "Full Stack Developer", "Graphic Designer", "Testing"]
    },
    {
        filterType:"Salary",
        array:["0-30k", "31-60k", "61-1lakh", "1.1-5lakh", "5.1-10lakh"]
    },
    
]

const FilterCards = () => {
    const [selectedValue, setSelectedValue] =useState("");
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue))
    },[selectedValue])
  return (
    <div className='w-full bg-white p-3 rounded-md shadow-lg'>
        <h1>Filter Jobs</h1>
        <hr className='mt-3'/>
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {
                filterData.map((data, index) => (
                    <div>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {
                            data.array.map((item, idx)=>{
                                const itemId =`id${index}-${idx}`
                                return (
                                    <div className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem 
                                        value={item} id={itemId}/>
                                        <Label htmlFor={itemId}>{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default FilterCards 