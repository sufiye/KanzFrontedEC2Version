import { Link } from "react-router-dom"
import { useDarkmode } from "../stores/store"
const Navbar = () => {
  const {toggleDarkmode, isDarkmodeEnabled } = useDarkmode()
  return (
    <>
      <div className={`pt-5 flex items-center justify-center gap-50 ${isDarkmodeEnabled ? "bg-[#181A2A]" : "bg-white"}`}>

        <div className="flex items-center gap-2">
          {isDarkmodeEnabled ? <img src="..\src\assets\Logolight.png" alt="" /> :
            <img src="..\src\assets\Logo1.png" alt="" />
          }
        </div>

        <div className="flex items-center gap-20">

          <div className={`flex items-center gap-8 ${isDarkmodeEnabled? "text-white":"text-black"}`}>
            <Link to={"/"}><button className="cursor-pointer">Home</button></Link>
            <Link to={"/newBlog"}><button className="cursor-pointer">Write a Blog</button></Link>
            <Link to={"/myBlogs"}><button className="cursor-pointer">My Blogs</button></Link>
            <a href="#contact">Contact</a>
          </div>

        </div>

        <button className={`w-11 h-7 flex items-center bg-zinc-200  rounded-full p-1 cursor-pointer`} onClick={toggleDarkmode}>
          <div className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300  ${isDarkmodeEnabled ? "translate-x-4" : ""} `}>
            {isDarkmodeEnabled ? "d" : "l"}
          </div>
        </button>
      </div>
    </>
  )
}

export default Navbar