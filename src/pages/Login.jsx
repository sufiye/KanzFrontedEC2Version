import NavbarLR from "../components/NavbarLR"
import Footer from "../components/Footer"
import { Link, useNavigate } from "react-router-dom"
import { useTokens } from "../stores/tokenStore"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useDarkmode } from "../stores/store"
const Login = () => {
    const navigate = useNavigate()
    const { setAccessToken, setRefreshToken } = useTokens()
    const [formData, setFormData] = useState({ email: "", password: "" })
    const { isDarkmodeEnabled } = useDarkmode()

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
            toast.error("Email or password incorrect !")

        }
    }
    return (
       <div className={`w-full min-h-screen ${isDarkmodeEnabled ? "bg-[#181A2A]" : "bg-pink-50"} transition-all`}>

    <NavbarLR />

    <div className="my-20 flex justify-center items-center flex-col space-y-6">

        {/* Title */}
        <h1
            className={`text-4xl font-extrabold pb-2 mb-10 bg-gradient-to-r 
            from-pink-400 via-pink-500 to-pink-600 
            bg-clip-text text-transparent`}
        >
            Login
        </h1>

        {/* Email */}
        <input
            value={formData?.email}
            onChange={(e) => {
                handleInputChange("email", e.target.value)
            }}
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
            onChange={(e) => {
                handleInputChange("password", e.target.value)
            }}
            className={`w-140 h-13 p-4 rounded-xl border border-pink-200 shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-pink-400 transition
            ${isDarkmodeEnabled
                    ? "bg-[#232536] placeholder:text-zinc-400 text-white"
                    : "bg-white placeholder:text-zinc-500 text-black"
                }`}
            placeholder="Enter your password"
            type="password"
        />

        {/* Register link */}
        <Link to={"/register"}>
            <button
                className="text-sm text-pink-500 underline hover:text-pink-600 transition cursor-pointer "
            >
                Don’t have an account?
            </button>
        </Link>

        {/* Login Button */}
        <button
            onClick={handleLogin}
            className="w-140 h-14 rounded-xl bg-gradient-to-r 
            from-pink-400 to-pink-600 text-white text-lg font-bold 
            shadow-md hover:scale-105 hover:shadow-pink-300 transition duration-300 cursor-pointer"
        >
            Login
        </button>

    </div>

    <Footer />

</div>
    )
}

export default Login