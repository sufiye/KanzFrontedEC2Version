import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useState, useEffect } from "react"
import api from "../utils/axios"
import { useParams } from "react-router-dom"
import { useDarkmode } from "../stores/store"
import { useNavigate } from "react-router-dom"


const Order = () => {
  const { isDarkmodeEnabled } = useDarkmode()
  const { id } = useParams()
  const [deleteblog, setDeleteblog] = useState(false)
  const [visibleCount, setVisibleCount] = useState(10)
  const [blogs, setBlogs] = useState([])
  const navigate = useNavigate()

  const visibleBlogs = blogs.slice(0, visibleCount)

  const getBlogs = async () => {
    try {
      let url = ""

      if (id) {
        url = `/user/${id}`
      } else {
        url = "/user/me"
        setDeleteblog(true)
      }

      const { data, statusText } = await api.get(url)

      if (statusText === "OK") {
        setBlogs(data)
        console.log(data);
      }
    
    } catch (error) {
      console.error(error)
    }
  }

useEffect(() => {
  const token = localStorage.getItem("tokens")

  if (!token) {
    navigate("/login")
    return
  }

  getBlogs()
}, [id])

  return (
    <>
      <div className={`h-fit w-full ${isDarkmodeEnabled ? "bg-[#181A2A]" : "bg-white"}`}>
        <Navbar />
   
        <Footer />
      </div >
    </>
  )
}

export default Order