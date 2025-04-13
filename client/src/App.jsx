
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/Home'
import { Toaster } from './components/ui/sonner'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs"
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import JobUpdate from './components/admin/JobUpdate'


const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/jobs",
    element:<Jobs/>
  },
  {
    path:"/description/:id",
    element:<JobDescription/>
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  //admin routes start here
  {
    path:"/admin/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  {
    path:"admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute>
  },
  {
    path:`/admin/jobs/:id/applicants`,
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  },
  {
    path:"/admin/job/update/:id",
    element:<ProtectedRoute><JobUpdate/></ProtectedRoute>
  }
])

function App() {
  

  return (
    <div>
       <RouterProvider router={appRouter}/>
       <Toaster/>
    </div>
  )
}

export default App

//11:56
