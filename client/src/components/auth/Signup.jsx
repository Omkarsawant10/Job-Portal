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
import { setLoading } from "@/redux/authSlice"
import { Loader2 } from "lucide-react"

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })

    const navigate = useNavigate();
    const { loading ,user} = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const changeFileHandler = (e) => {
        console.log(e.target)
        setInput((prev) => {
            return { ...prev, file: e.target.files?.[0] };
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input)
        dispatch(setLoading(true))
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {

            formData.append("file", input.file);
        }
        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            console.log(res)
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl mb-5">Sign Up</h1>
                    <div className="my-3">
                        <Label className="mb-2">Full Name</Label>
                        <Input type="text" placeholder="Omkar" value={input.fullname} name="fullname" onChange={changeEventHandler} />
                    </div>
                    <div className="my-3">
                        <Label className="mb-2">Email</Label>
                        <Input type="email" placeholder="omkar@gmail.com" value={input.email} name="email" onChange={changeEventHandler} />
                    </div>
                    <div className="my-3">
                        <Label className="mb-2">Phone Number</Label>
                        <Input type="number" placeholder="9858686896" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} />
                    </div>
                    <div className="my-3">
                        <Label className="mb-2">Password</Label>
                        <Input type="password" placeholder="9858686896" value={input.password} name="password" onChange={changeEventHandler} />
                    </div>
                    <div className="flex items-center justify-between">
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="student" className="cursor-pointer" checked={input.role === "student"} onChange={changeEventHandler} />
                                <Label htmlFor="option-one">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" className="cursor-pointer" checked={input.role === "recruiter"} onChange={changeEventHandler} />
                                <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className="flex items-center gap-2">
                            <Label>Profile</Label>
                            <Input accept="image/*" type="file" className="cursor-pointer" name="file" onChange={changeFileHandler} />

                        </div>

                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait</Button> :
                            <Button type="Submit" className="w-full my-4">Submit</Button>
                    }

                    <span className="text-sm">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup
