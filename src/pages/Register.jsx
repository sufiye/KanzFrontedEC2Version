import NavbarLr from "../components/NavbarLR"
import Footer from "../components/Footer"
import { Link, useNavigate } from "react-router-dom"
import { useTokens } from "../stores/tokenStore"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useDarkmode } from "../stores/store"
const Register = () => {
    const {isDarkmodeEnabled} = useDarkmode()
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
      <div className={`w-full min-h-screen ${isDarkmodeEnabled ? "bg-[#181A2A]" : "bg-pink-50"} transition-all`}>

    <NavbarLr />

    <div className="my-20 flex justify-center items-center flex-col space-y-6">

        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-10 pb-2 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">
            Register
        </h1>

        {/* Firstname */}
        <input
            value={formData?.firstname}
            onChange={(e) => handleInputChange("firstname", e.target.value)}
            className={`w-140 h-13 p-4 rounded-xl border border-pink-200 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-pink-400 transition
            ${isDarkmodeEnabled
                ? "bg-[#232536] placeholder:text-zinc-400 text-white"
                : "bg-white placeholder:text-zinc-500 text-black"
            }`}
            placeholder="Enter your firstname"
            type="text"
        />

        {/* Lastname */}
        <input
            value={formData?.lastname}
            onChange={(e) => handleInputChange("lastname", e.target.value)}
            className={`w-140 h-13 p-4 rounded-xl border border-pink-200 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-pink-400 transition
            ${isDarkmodeEnabled
                ? "bg-[#232536] placeholder:text-zinc-400 text-white"
                : "bg-white placeholder:text-zinc-500 text-black"
            }`}
            placeholder="Enter your lastname"
            type="text"
        />

        {/* Email */}
        <input
            value={formData?.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-140 h-13 p-4 rounded-xl border border-pink-200 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-pink-400 transition
            ${isDarkmodeEnabled
                ? "bg-[#232536] placeholder:text-zinc-400 text-white"
                : "bg-white placeholder:text-zinc-500 text-black"
            }`}
            placeholder="Enter your email"
            type="email"
        />

        {/* Password */}
        <input
            value={formData?.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className={`w-140 h-13 p-4 rounded-xl border border-pink-200 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-pink-400 transition
            ${isDarkmodeEnabled
                ? "bg-[#232536] placeholder:text-zinc-400 text-white"
                : "bg-white placeholder:text-zinc-500 text-black"
            }`}
            placeholder="Enter your password"
            type="password"
        />

        {/* Login link */}
        <Link to={"/login"}>
            <button className="text-sm text-pink-500 underline hover:text-pink-600 transition cursor-pointer">
                Already have an account?
            </button>
        </Link>

        {/* Register Button */}
        <button
            onClick={handleRegister}
            className="w-140 h-14 rounded-xl bg-gradient-to-r 
            from-pink-400 to-pink-600 text-white text-lg font-bold 
            shadow-md hover:scale-105 hover:shadow-pink-300 transition duration-300 cursor-pointer"
        >
            Register
        </button>

    </div>

    <Footer />

</div>
    )
}

export default Register