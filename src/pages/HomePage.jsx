import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Card from "../components/Card"
import BigCard from "../components/BigCard"
import api from "../utils/axios"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDarkmode } from "../stores/store"
const HomePage = () => {

  const [cards, setCards] = useState([])
  const [allCard, setAllCard] = useState(false)
  const [page, setPage] = useState(1)
  const [searchterm, setSearchterm] = useState("")
  const { isDarkmodeEnabled } = useDarkmode()
  const { category } = useParams()



  const getCards = async () => {
    try {

      let url = "?page=1&limit=10"

      if (searchterm.length >= 3) {
        url += `&search=${searchterm}`
      }

      if (category) {
        url += `&category=${category}`
      }

      const { data, statusText } = await api.get(url)

      console.log(data)

      if (statusText === "OK") {

        setCards(data.blogs)
        console.log(data);

      }
    } catch (error) {
      console.error(error)
    }
  }

  const loadMoreBtn = async () => {
    try {

      const nextPage = page + 1
      let url = `?page=${nextPage}&limit=10`
      if (category) {
        url+= `&category=${category}`
      }

      const { data, statusText } = await api.get(url)
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
  }, [searchterm, category])

  return (
    <div className={`w-full h-fit ${isDarkmodeEnabled ? "bg-[#181A2A]" : "bg-white"}`}>
      <Navbar searchterm={searchterm} setSearchterm={setSearchterm} />
      <div className=" flex justify-center items-center flex-col my-20">
        <div className="grid grid-cols-3 gap-5 ">

          {cards.map((card, index) => (
            index === 0 && searchterm.length < 2
              ? <BigCard key={card._id} card={card} />
              : <Card key={card._id} card={card} />

          ))}

        </div>
        <div >
          {searchterm ? "" :
            <button onClick={allCard ? showLess : loadMoreBtn} className={` border-2  rounded-lg 
          h-13 w-33 text-sm mt-10 cursor-pointer ${isDarkmodeEnabled ? "text-zinc-300 border-zinc-400" : "text-[#696A75] border-[#696A754D]/40"}`}>{allCard ? "Show Less" : "Load More"}</button>}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HomePage