
const Navbar = () => {
  return (
    <>
      <div className="pt-5 flex items-center justify-center gap-50">

        <div className="flex items-center gap-2">
          <img src="src\assets\Logo1.png" alt="" />
        </div>

        <div className="flex items-center gap-20">

          <div className="flex items-center gap-8">
            <a href="">Home</a>
            <a href="">Write a Blog</a>
            <a href="">My Blogs</a>
            <a href="">Contact</a>
          </div>

          <div className="flex items-center gap-5">

            <div className="relative">

              <input className="bg-zinc-100 rounded-sm w-[166px] pl-4 p-2 " placeholder="Search" type="search" name="" id="" />
              <img className="absolute right-3 top-3" src="src\assets\search.png" alt="" />
            </div>

            <button className="bg-black text-white h-[36px] w-[68px] rounded-sm ">Sing In</button>

          </div>

        </div>


      </div>
    </>
  )
}

export default Navbar