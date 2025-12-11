import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const NotFound = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        const timer = setTimeout(()=>{
            navigate("/")
        },3000)

        return ()=>clearTimeout(timer);
    },[])
  return (
    <div  className='w-full h-screen flex justify-center items-center'>
       <h2 className='text-5xl text-pink-600 font-bold'> Not Found :|</h2>
        </div>
  )
}

export default NotFound