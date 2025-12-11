import {useState } from "react"
import { useTokens } from "../stores/tokenStore"
import { useDarkmode } from "../stores/store"
import axios from "axios"

const Login = () => {
    const {setAccessToken ,setRefreshToken} = useTokens()
    const {toggleDarkmode,isDarkmodeEnabled} = useDarkmode()
    const[formData,setFormData] = useState({email:"",password:""})

    const handleInputChange = (title,value)=>{
        setFormData(prevState => ({
            ...prevState,
            [title]:value
        }))
    }

    const handleLogin = async ()=>{
        try {
       const {data, statusText} = await axios.post("https://ilkinibadov.com/api/v1/auth/login",formData,{
        headers: {
            "Content-Type": "application/json"
        }
       })
       if (statusText === 'OK') {
        setAccessToken(data.accessToken)
        setRefreshToken(data.refreshToken)
       }


        } catch (error) {
            console.error(error)
        }
    }


  return (
    <>
<div className={`${isDarkmodeEnabled ? "bg-gray-900":"bg-white" } transition-all duration-400 `}>
        <div className="w-full flex justify-end relative">
         <button onClick={toggleDarkmode} className= 'absolute top-2 right-2 bg-cyan-900 text-white rounded-sm px-2 p-3 '>
            {isDarkmodeEnabled?"Disable Darkmode": "Enable Darkmode"}</button>
         </div>
       
    <div className="w-full h-screen flex justify-center items-center">
        <div className=" border border-zinc-300 p-5 max-w-[300px] w-full h-fit flex flex-col gap-5" >
        <input value={formData.email} onChange={(e)=>{
            handleInputChange("email",e.target.value)
        }} className={`${isDarkmodeEnabled?"placeholder:text-zinc-300 text-white":"placeholder:text-zinc-400 text-black"} border  border-zinc-300 p-2`} placeholder="Enter your email" type="email" />
        <input value={formData.password}  onChange={(e)=>{
            handleInputChange("password",e.target.value)
        }} className={`${isDarkmodeEnabled?"placeholder:text-zinc-300 text-white":"placeholder:text-zinc-400 text-black"} border  border-zinc-300 p-2`} placeholder="Enter your password" type="password" />
        <button onClick={handleLogin} className="bg-cyan-900  py-2 text-white">Login</button>
    </div>
    </div>
</div>
    </>
  )
}

export default Login