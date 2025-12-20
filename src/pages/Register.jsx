import NavbarLr from "../components/NavbarLR"
import Footer from "../components/Footer"
import { Link, useNavigate } from "react-router-dom"
import { useTokens } from "../stores/tokenStore"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const Register = () => {
    const navigate = useNavigate()
    const { setAccessToken, setRefreshToken } = useTokens()
    const [formData, setFormData] = useState({ firstname: "", lastname: "", email: "", password: "" })

    const handleInputChange = (title, value) => {
        setFormData(prevState => ({
            ...prevState,
            [title]: value
        }))
    }

    const handleRegister = async () => {
        try {
            const { data, statusText } = await axios.post("https://ilkinibadov.com/api/b/auth/register", formData, {
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
            toast.error("Error")
        }
    }


    return (
        <div className="w-full h-screen">
            <NavbarLr />
            <div className="h-fit my-20 flex justify-center items-center flex-col space-y-5">

                <h1 className="text-4xl font-bold mb-16 text-[#232536]">Register</h1>
                <input value={formData?.firstname} onChange={(e) => {
                    handleInputChange("firstname", e.target.value)
                }} className=" border w-140 h-13 p-4 border-zinc-300  text-sm placeholder:text-[#232536]" placeholder="Enter your firstname" type="text" />
                <input value={formData?.lastname} onChange={(e) => {
                    handleInputChange("lastname", e.target.value)
                }} className=" border w-140 h-13 p-4 border-zinc-300  text-sm placeholder:text-[#232536]" placeholder="Enter tour lastname" type="text" />
                <input value={formData?.email} onChange={(e) => {
                    handleInputChange("email", e.target.value)
                }} className=" border w-140 h-13 p-4 border-zinc-300  text-sm placeholder:text-[#232536]" placeholder="Enter your email" type="email" name="" id="" />
                <input value={formData?.password} onChange={(e) => {
                    handleInputChange("password", e.target.value)
                }} className=" border w-140 h-13 p-4  border-zinc-300 text-sm placeholder:text-[#232536]" placeholder="Enter your password" type="password" name="" id="" />
                <Link to={"/login"}> <button className="text-sm text-blue-500 mr-99 underline cursor-pointer" >Already have an account?</button></Link>
                <button onClick={handleRegister} className="bg-[#FFD050] w-140 h-15 "><h1 className="text-xl font-bold text-[#232536] cursor-pointer">Register</h1></button>
            </div>

            <Footer />
        </div>
    )
}

export default Register