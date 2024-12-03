
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Jobs from "./components/jobs/Jobs";
import Browse from "./components/browse/Browse";
import Profile from "./components/profile/Profile";
import JobDescription from "./components/JobDescription";
import AdminCompanies from "./components/admin/AdminCompanies";
import AdminJobs from "./components/admin/AdminJobs";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import JobSetup from "./components/admin/JobSetup";
import Applicants from "./components/admin/Applicants";

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<SignUp/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },

  // Admin pannel

  {
    path:'/admin/companies',
    element:<AdminCompanies/>
  },
  {
    path:'/admin/jobs',
    element:<AdminJobs/>
  },
  
  {
    path:'/admin/companies/companycreate',
    element:<CompanyCreate/>
  },

  {
    path:'/admin/companies/:id',
    element:<CompanySetup/>
  },
  {
    path:'/admin/jobs/jobcreate',
    element:<JobSetup/>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<Applicants/>
  },
  

])
function App() {
  return(
    <div>
    <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
