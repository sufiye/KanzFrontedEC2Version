import NavbarLR from "../components/NavbarLR"
import Footer from "../components/Footer"
import { Link, useNavigate } from "react-router-dom"
import { useTokens } from "../stores/tokenStore"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
const Login = () => {
    const navigate= useNavigate()
    const { setAccessToken, setRefreshToken } = useTokens()
    const [formData, setFormData] = useState({ email: "", password: "" })

    const handleInputChange = (title, value) => {
        setFormData(prevState => ({
            ...prevState,
            [title]: value
        }))
    }

    const handleLogin = async () => {
        try {
            const { data, statusText } = await axios.post("https://ilkinibadov.com/api/b/auth/login", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (statusText === "OK") {
                setAccessToken(data.accessToken)
                setRefreshToken(data.refreshToken)
                console.log(data);
                toast.success("success : )")
                navigate("/")

            }

        } catch (error) {
            console.error(error)
            toast.error("error : (")
        }
    }
    return (
        <div className="w-full h-screen">
            <NavbarLR />
            <div className="h-fit my-20 flex justify-center items-center flex-col space-y-5">

                <h1 className="text-4xl font-bold mb-16 text-[#232536]">Login</h1>
                <input value={formData?.email} onChange={(e) => {
                    handleInputChange("email", e.target.value)
                }} className=" border w-140 h-13 p-4 border-zinc-300  text-sm placeholder:text-[#232536]" placeholder="Enter your email" type="email" name="" id="" />
                <input value={formData?.password} onChange={(e) => {
                    handleInputChange("password", e.target.value)
                }} className=" border w-140 h-13 p-4  border-zinc-300 text-sm placeholder:text-[#232536]" placeholder="Enter your password" type="password" name="" id="" />
                <Link to={"/register"}> <button className="text-sm text-blue-500 mr-103 underline cursor-pointer" >Don’t have an account?</button></Link>
                <button onClick={handleLogin} className="bg-[#FFD050] w-140 h-15 "><h1 className="text-xl font-bold text-[#232536] cursor-pointer">Login</h1></button>
            </div>
            <Footer />
        </div>
    )
}

export default Login