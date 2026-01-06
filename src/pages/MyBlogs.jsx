import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useState, useEffect } from "react"
import api from "../utils/axios"
import Card from "../components/Card"
import { useParams } from "react-router-dom"
import { useDarkmode } from "../stores/store"
import { useNavigate } from "react-router-dom"
const MyBlogs = () => {
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
        <div className=" flex justify-center items-center flex-col my-20">
          <div className={`w-235 h-30 flex justify-center items-center rounded-2xl  mb-10 ${isDarkmodeEnabled ? "bg-slate-800" : "bg-[#F6F6F7]"}`}><a className={`${isDarkmodeEnabled ? "text-white" : "text-black"}`} href="">{blogs[0]?.user?.email}</a></div>
          <div className={`mr-193 text-3xl font-bold mb-10 ${isDarkmodeEnabled ? "text-white" : "text-black"}`}><h1>Latest Post</h1></div>
          <div className="grid grid-cols-3 gap-5 ">
            {visibleBlogs.map(blog => (
              <Card key={blog._id} card={blog} deleteblog={deleteblog} setDeleteblog={setDeleteblog} />
            ))}
          </div>
          {visibleCount < blogs.length && (
            <button
              onClick={() => setVisibleCount(prev => prev + 10)}
              className={` border-2  rounded-lg  h-13 w-33 text-sm mt-10 cursor-pointer
                ${isDarkmodeEnabled ? "text-zinc-300 border-zinc-400" : "text-[#696A75] border-[#696A754D]/40"}`}>
              Load more
            </button>
          )}
        </div>
        <Footer />
      </div >
    </>
  )
}

export default MyBlogs