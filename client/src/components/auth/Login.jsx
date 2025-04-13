
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup } from "../ui/radio-group"
import { useEffect, useState } from "react"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constants"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, setUser } from "@/redux/authSlice"
import { Loader2 } from "lucide-react"

const Login = () => {
    const [input,setInput]=useState({
        email:"",
        password:"",
        role:"",
       
    })
    
    const dispatch=useDispatch();
    const {loading,user}=useSelector(store=>store.auth)
    const navigate=useNavigate();
    const changeEventHandler=(e)=>{
          const {name,value}=e.target;
          setInput((prev)=>{
            return {...prev,[name]:value}
          })
    }
   
    const submitHandler=async(e)=>{
        e.preventDefault();
        dispatch(setLoading(true));
        console.log(input)
        try {
            const res=await axios.post(`${USER_API_END_POINT}/login`,input,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })

            if(res.data.success){
                console.log(res.data)
                dispatch(setUser(res.data.user))
                navigate("/");
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false))
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/")
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl mb-5">Log In</h1>
                    
                    <div className="my-3">
                        <Label className="mb-2">Email</Label>
                        <Input type="email" placeholder="omkar@gmail.com" value={input.email} name="email" onChange={changeEventHandler}/>
                    </div>
                    
                    <div className="my-3">
                        <Label className="mb-2">Password</Label>
                        <Input type="password" placeholder="9858686896" value={input.password} name="password" onChange={changeEventHandler}/>
                    </div>
                    <div className="flex items-center justify-between">
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="student" className="cursor-pointer" checked={input.role==="student"} onChange={changeEventHandler}/>
                                <Label htmlFor="option-one">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" className="cursor-pointer" checked={input.role==="recruiter"} onChange={changeEventHandler}/>
                                <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        

                    </div>
                    {
                        loading?<Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait</Button>:
                        <Button type="Submit" className="w-full my-4">Login</Button>
                    }
                    
                    <span className="text-sm">Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login

