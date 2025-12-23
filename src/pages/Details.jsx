import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import api from "../utils/axios"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"
import { useDarkmode } from "../stores/store"
const Details = () => {
  
  const {isDarkmodeEnabled} = useDarkmode()
  const [card, setCard] = useState({})
  const { id } = useParams()

  const getCards = async () => {
    try {
      const { data, statusText } = await api.get(`https://ilkinibadov.com/api/b/blogs/blog/${id}`)
      console.log(data)
      if (statusText === "OK") {
        setCard(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getCards()
  }, [id])

  return (
    <div className={`w-full h-fit ${isDarkmodeEnabled ? "bg-[#181A2A]":"bg-white"}`}>
      <Navbar />

      <div className="flex justify-center my-20">
        <div className="grid grid-cols-1 gap-5 w-200">
          <div className={`w-fit  py-1 px-4 rounded-lg ${isDarkmodeEnabled?"bg-[#4B6BFB]":"bg-blue-600 "}`}><p className="text-base text-white ">{card?.category}</p></div>
          <h1 className={`text-4xl font-bold ${isDarkmodeEnabled?"text-white":"text-black"}`}>{card?.title}</h1>
          <div className="flex gap-5  text-sm text-zinc-500">
            <Link to={`/myblogs/${card?.user?._id}`}><button className="cursor-pointer">{card?.user?.email}</button></Link>
            <p>{new Date(card?.createdAt).toLocaleDateString()}</p>
          </div>
          <img src={card?.image} alt="" className="w-[800px] h-[462px] rounded-xl object-cover mb-5" />
          <h1 className={`text-xl font-serif  ${isDarkmodeEnabled?"text-white":"text-black"}`} >{card?.description}</h1>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Details