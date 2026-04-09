import NavbarLR from "../components/NavbarLR"
import Footer from "../components/Footer"
import { Link, useNavigate } from "react-router-dom"
import { useTokens } from "../stores/tokenStore"
import { useState } from "react"
import toast from "react-hot-toast"
import { useDarkmode } from "../stores/store"
import api from "../utils/axios"

const API_URL = "http://localhost:5064/api"

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
            const res = await api.post("/Auth/login", formData)

            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)

            toast.success("Login successful")
            navigate("/")

        } catch (error) {
            toast.error("Email or password incorrect!")
        }
    }

    return (
        <div className={`w-full min-h-screen transition-all
        ${isDarkmodeEnabled
                ? "bg-[#1c1814] text-[#e6dccf]"
                : "bg-[#f4efe7] text-[#3a3835]"
            }`}>

            <NavbarLR />

            <div className="flex justify-center items-center my-20 px-4">

                {/* CARD */}
                <div className={`w-full max-w-md p-10 rounded-2xl shadow-sm
                ${isDarkmodeEnabled
                        ? "bg-[#26221d]"
                        : "bg-white"
                    }`}>

                    {/* TITLE */}
                    <h1 className="text-2xl text-center mb-8 tracking-[3px]">
                        LOGIN
                    </h1>

                    {/* EMAIL */}
                    <input
                        value={formData?.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full p-3 mb-4 border rounded-lg text-sm transition
                        focus:outline-none
                        ${isDarkmodeEnabled
                                ? "bg-[#1c1814] border-[#3a342c] text-white placeholder:text-[#a8a093]"
                                : "bg-[#f9f6f1] border-[#ddd] text-black placeholder:text-gray-500"
                            }`}
                        placeholder="Email"
                        type="email"
                    />

                    {/* PASSWORD */}
                    <input
                        value={formData?.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={`w-full p-3 mb-4 border rounded-lg text-sm transition
                        focus:outline-none
                        ${isDarkmodeEnabled
                                ? "bg-[#1c1814] border-[#3a342c] text-white placeholder:text-[#a8a093]"
                                : "bg-[#f9f6f1] border-[#ddd] text-black placeholder:text-gray-500"
                            }`}
                        placeholder="Password"
                        type="password"
                    />

                    {/* LINK */}
                    <Link to={"/register"}>
                        <p className="text-xs mb-6 opacity-70 hover:opacity-100 cursor-pointer">
                            Don’t have an account?
                        </p>
                    </Link>

                    {/* BUTTON */}
                    <button
                        onClick={handleLogin}
                        className="w-full border py-3 text-sm tracking-wide transition
                        hover:bg-black hover:text-white"
                    >
                        LOGIN
                    </button>

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Login