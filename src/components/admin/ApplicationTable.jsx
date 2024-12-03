import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_BACKEND_API } from '@/utils/constants'
import axios from 'axios'

const ShortlistedStatus = ["Accepted", "Rejected"];

const ApplicationTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async(status,id) => {
        try {
            axios.defaults.withCredentials=true;
            const response = await axios.post(`${APPLICATION_BACKEND_API}/status/${id}/update`,{status})
            if(response.data.success){
                toast.success(response.data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contacts</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants && applicants?.applications?.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item?.applicant?.fullname}</TableCell>
                            <TableCell>{item?.applicant?.email}</TableCell>
                            <TableCell>{item?.applicant?.phonenumber}</TableCell>
                            <TableCell>
                            {
                                item.applicant?.profile?.resume ? <a href='{item?.applicant?.profile?.resume}'>{item?.applicant?.profile?.resume}</a> :<span>NA</span>
                            }
                            
                            </TableCell>
                            <TableCell>{item?.applicant.createdAt.split('T')[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40">
                                        {ShortlistedStatus?.map((status, index) => (
                                            <div onClick={()=>statusHandler(status,item._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                <span>{status}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicationTable;
