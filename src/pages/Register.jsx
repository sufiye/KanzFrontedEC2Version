import NavbarLr from "../components/NavbarLR"
import Footer from "../components/Footer"
import { Link, useNavigate } from "react-router-dom"
import { useTokens } from "../stores/tokenStore"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useDarkmode } from "../stores/store"
import api from "../utils/axios"



const Register = () => {
  const { isDarkmodeEnabled } = useDarkmode()
  const navigate = useNavigate()
  const { setAccessToken, setRefreshToken } = useTokens()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmedPassword: ""
  })

  const handleInputChange = (title, value) => {
    setFormData(prev => ({ ...prev, [title]: value }))
  }

  const handleRegister = async () => {
    try {
      const res = await api.post("/Auth/register", formData)

      setAccessToken(res.data.accessToken)
      setRefreshToken(res.data.refreshToken)

      toast.success("Account created successfully 🎉")
      navigate("/")
    } catch (error) {
      console.error(error)
      toast.error("Register failed")
    }
  }

  const inputClass = `w-80 p-3 rounded-xl border border-pink-200 shadow-sm
    focus:outline-none focus:ring-2 focus:ring-pink-400 transition
    ${isDarkmodeEnabled
      ? "bg-[#232536] placeholder:text-zinc-400 text-white"
      : "bg-white placeholder:text-zinc-500 text-black"
    }`

  return (
    <div className={`w-full min-h-screen ${isDarkmodeEnabled ? "bg-[#181A2A]" : "bg-pink-50"} transition-all`}>
      <NavbarLr />

      <div className="my-20 flex justify-center items-center flex-col space-y-4">

        <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">
          Register
        </h1>

        <input
          value={formData.firstName}
          onChange={e => handleInputChange("firstName", e.target.value)}
          className={inputClass}
          placeholder="First Name"
          type="text"
        />
        <input
          value={formData.lastName}
          onChange={e => handleInputChange("lastName", e.target.value)}
          className={inputClass}
          placeholder="Last Name"
          type="text"
        />
        <input
          value={formData.address}
          onChange={e => handleInputChange("address", e.target.value)}
          className={inputClass}
          placeholder="Address"
          type="text"
        />
        <input
          value={formData.phoneNumber}
          onChange={e => handleInputChange("phoneNumber", e.target.value)}
          className={inputClass}
          placeholder="Phone Number"
          type="tel"
        />
        <input
          value={formData.email}
          onChange={e => handleInputChange("email", e.target.value)}
          className={inputClass}
          placeholder="Email"
          type="email"
        />
        <input
          value={formData.password}
          onChange={e => handleInputChange("password", e.target.value)}
          className={inputClass}
          placeholder="Password"
          type="password"
        />
        <input
          value={formData.confirmedPassword}
          onChange={e => handleInputChange("confirmedPassword", e.target.value)}
          className={inputClass}
          placeholder="Confirm Password"
          type="password"
        />

        <Link to="/login" className="text-sm text-pink-500 underline hover:text-pink-600 transition">
          Already have an account?
        </Link>

        <button
          onClick={handleRegister}
          className="w-80 h-12 rounded-xl bg-gradient-to-r from-pink-400 to-pink-600 text-white font-bold hover:scale-105 transition"
        >
          Register
        </button>

      </div>

      <Footer />
    </div>
  )
}

export default Register