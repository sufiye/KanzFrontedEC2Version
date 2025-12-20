import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Card from "../components/Card"
import BigCard from "../components/BigCard"
import api from "../utils/axios"
import { useState, useEffect } from "react"
const HomePage = () => {
  const [cards, setCards] = useState([])

  const getCards = async () => {
    try {
      const { data, statusText } = await api.get()
      console.log(data)
      if (statusText === "OK") {
        setCards(data.blogs)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const loadMoreBtn = async ()=>{
        try {
      const { data, statusText } = await api.get("?page=1&limit=10")
      console.log(data)
      if (statusText === "OK") {
        setCards(data.blogs)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getCards()
  }, [])

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className=" flex justify-center items-center flex-col my-20">
        <div className="grid grid-cols-3 gap-5 ">
          {cards.map((card, index) => (
            index === 0
              ? <BigCard key={card._id} card={card} />
              : <Card key={card._id} card={card} />
          ))}
        </div>
        <div className="">
          <button  className="text-[#696A75] border-2 border-[#696A754D]/40  rounded-lg h-13 w-33 text-sm mt-10 cursor-pointer">Load More</button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HomePage