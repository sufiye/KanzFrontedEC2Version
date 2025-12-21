import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useState, useEffect } from "react"
import api from "../utils/axios"
import Card from "../components/Card"
import { useParams } from "react-router-dom"

const MyBlogs = () => {
  const { id } = useParams()
  const [blogs, setBlogs] = useState([])

  const getBlogs = async () => {
    try {
      let url = ""

      if (id) {
        url = `/user/${id}`
      } else {
        url = "/user/me"
      }

      const { data, statusText } = await api.get(url)

      if (statusText === "OK") {
        setBlogs(data)
        console.log(data);
        console.log(id);
        
        
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getBlogs()
  }, [id])

  return (
    <>
      <div className="h-screen w-full">
        <Navbar />
        <div className=" flex justify-center items-center flex-col my-20">
          <div className="w-235 h-30 flex justify-center items-center rounded-2xl bg-[#F6F6F7] mb-10"><a href="">{blogs[0]?.user.email}</a></div>
          <div className="mr-193 text-3xl font-bold mb-10"><h1>Latest Post</h1></div>
          <div className="grid grid-cols-3 gap-5 ">
          {blogs.map(blog => (
          <Card key={blog._id} card={blog} />
        ))}
        </div>
      </div>

      <Footer />
    </div >
        </>
  )
}

export default MyBlogs