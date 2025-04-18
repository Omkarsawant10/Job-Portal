

import CategoryCarousel from './CategoryCarousel'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import Navbar from './shared/Navbar'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGetAllJobs } from '@/hooks/useGetAllJobs'


const Home = () => {
  
    useGetAllJobs();
  
  const {user}=useSelector(state=>state.auth);
  const navigate=useNavigate();
  useEffect(()=>{
     if(user?.role==="recruiter"){
        navigate("/admin/companies")
     }
  },[])
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home
