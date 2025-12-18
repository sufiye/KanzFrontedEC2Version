import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Card from "../components/Card"
import api from "../utils/axios"
import { useState,useEffect } from "react"
const HomePage = () => {
  const [cards,setCards] = useState([])
  
  const getCards = async () => {
    try {
        const { data, statusText } = await api.get("https://ilkinibadov.com/api/b/blogs")
        console.log(data)
        if (statusText === "OK") {
          setCards(data.blogs)
        }
    } catch (error) {
        console.error(error)
    }
}

useEffect(()=>{
  getCards()
},[])

  return (
    <div className="w-full h-screen">
        <Navbar/>
        <div className=" flex justify-center items-center my-10">
          <div className="grid grid-cols-3 gap-5">
         { cards.map(card =>  <Card card={card}/>)}
         </div>
        </div>
      
        <Footer/>
    </div>
  )
}

export default HomePage