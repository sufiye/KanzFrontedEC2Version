
import { Link } from "react-router-dom"
import{useDarkmode} from "../stores/store"


const Navbar = ({ searchterm, setSearchterm }) => {

const {toggleDarkmode,isDarkmodeEnabled} = useDarkmode()

  return (
    <>
      <div className={`pt-5 flex items-center justify-center gap-50 ${isDarkmodeEnabled ? "bg-[#181A2A]":"bg-white"}`}>

        <div className="flex items-center gap-2">
          {isDarkmodeEnabled?<img src="..\src\assets\Logolight.png" alt="" />:
          <img src="..\src\assets\Logo1.png" alt="" />
          }
        </div>

        <div className="flex items-center gap-20">

          <div className={`flex items-center gap-8 ${isDarkmodeEnabled? "text-white":"text-black"}`}>
            <Link to={"/"}><button className="cursor-pointer">Home</button></Link>
            <Link to={"/newBlog"}><button className="cursor-pointer">Write a Blog</button></Link>
            <Link to={"/myBlogs"}><button className="cursor-pointer">My Blogs</button></Link>
            <a href="#contact" >Contact</a>
          </div>

          <div className="flex items-center gap-5">

            <div className="relative">

              <input className={` rounded-sm w-[166px] pl-4 p-2 ${isDarkmodeEnabled?"bg-[#242535] placeholder:text-zinc-500 text-white":"bg-zinc-100 text-black"}`} placeholder="Search" type="search" value={searchterm} onChange={(e) => {
                setSearchterm(e.target.value)
              }} />
              <img className="absolute right-3 top-3" src="..\src\assets\search.png" alt="" />
            </div>

            <button className={`w-11 h-7 flex items-center bg-zinc-200  rounded-full p-1 cursor-pointer`} onClick={toggleDarkmode}>
              <div className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300  ${isDarkmodeEnabled ? "translate-x-4" : ""} `}>
                {isDarkmodeEnabled ?"d":"l"}
              </div>
            </button>

            <Link to={"/login"}><button className={`bg-black text-white h-[36px] w-[68px] rounded-sm `}>Sing In</button></Link>

          </div>

        </div>


      </div>
    </>
  )
}

export default Navbar