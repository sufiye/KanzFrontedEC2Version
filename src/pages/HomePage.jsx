import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Card from "../components/Card"
import BigCard from "../components/BigCard"
import api from "../utils/axios"
import { useState, useEffect } from "react"
const HomePage = () => {
  const [cards, setCards] = useState([])
  const [allCard, setAllCard] = useState(false)
  const [page, setPage] = useState(1)



  const getCards = async () => {
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

  const loadMoreBtn = async () => {
    try {
      const nextPage = page + 1

      const { data, statusText } = await api.get(`?page=${nextPage}&limit=10`)
      console.log(data)
      if (statusText === "OK") {
        setCards(prev => [...prev, ...data.blogs])
        setPage(nextPage)
        if (data.totalPages <= nextPage) {
          setAllCard(true)

        }
      }

    } catch (error) {
      console.error(error)
    }
  }

  const showLess = () => {
    setCards(cards.slice(0, 10))
    setPage(1)
    setAllCard(false)
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
          <button onClick={allCard ? showLess : loadMoreBtn} className="text-[#696A75] border-2 border-[#696A754D]/40  rounded-lg h-13 w-33 text-sm mt-10 cursor-pointer">{allCard ? "Show Less" : "Load More"}</button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HomePage