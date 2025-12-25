import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDarkmode } from '../stores/store'
const NotFound = () => {
  const { isDarkmodeEnabled } = useDarkmode()

    const navigate = useNavigate();
    useEffect(()=>{
        const timer = setTimeout(()=>{
            navigate("/")
        },3000)

        return ()=>clearTimeout(timer);
    },[])
  return (
    <div  className={`w-full h-screen flex  gap-10 justify-center items-center ${isDarkmodeEnabled ?"bg-[#181A2A]":"bg-white"}`}>
      <div className='grid grid-cols-1'>

      <div className='grid grid-cols-2 gap-5'>
      <div className='border-2 h-50 w-50 rounded-full flex justify-center  bg-white'><div className='border h-20 w-20 rounded-full mt-2 bg-black'></div></div>
      <div className='border-2 h-50 w-50 rounded-full flex justify-center bg-white'><div className='border h-20 w-20 rounded-full mt-2 bg-black'></div></div>
      </div>

      <div className='w-100 border-2 h-10 rounded-2xl mt-5 bg-white'></div>
      </div>
       <h2 className={`text-9xl  font-bold ${isDarkmodeEnabled?"text-white":"text-black"}`}> Not Found</h2>
        </div>
  )
}

export default NotFound