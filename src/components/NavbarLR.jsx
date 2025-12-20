import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <>
      <div className="pt-5 flex items-center justify-center gap-50">

        <div className="flex items-center gap-2">
          <img src="src\assets\Logo.png" alt="" />
          <h1 className="text-2xl">Meta</h1>
          <h1 className="text-2xl font-bold">Blog</h1>
        </div>

        <div className="flex items-center gap-20">

          <div className="flex items-center gap-8">
            <Link to={"/"}><button className="cursor-pointer">Home</button></Link>
            <Link to={"/newBlog"}><button className="cursor-pointer">Write a Blog</button></Link>
            <Link to={"/myBlogs"}><button className="cursor-pointer">My Blogs</button></Link>
            <a href="#contact">Contact</a>
          </div>

        </div>


      </div>
    </>
  )
}

export default Navbar