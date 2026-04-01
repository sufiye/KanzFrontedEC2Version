import { Link } from "react-router-dom"
import { useDarkmode } from "../stores/store"

const Navbar = ({ searchterm, setSearchterm }) => {

  const { toggleDarkmode, isDarkmodeEnabled } = useDarkmode()

  return (
    <div
      className={`pt-5 pb-5 flex items-center justify-center gap-40 transition-all
      ${isDarkmodeEnabled
          ? "bg-[#181A2A]"
          : "bg-gradient-to-r from-pink-50 via-white to-pink-50"
        }`}
    >

      {/* Logo */}
       <div className="flex items-center gap-2">
        <h1
          className={`text-3xl font-extrabold tracking-widest bg-gradient-to-r
          ${isDarkmodeEnabled
              ? "from-pink-300 to-pink-500"
              : "from-pink-600 to-pink-800"}
          bg-clip-text text-transparent drop-shadow-lg`}
        >
          Kanz
        </h1>
      </div>

      <div className="flex items-center gap-20">

        {/* Navigation */}
        <div
          className={`flex items-center gap-10 text-lg font-semibold
          ${isDarkmodeEnabled ? "text-gray-200" : "text-gray-700"}`}
        >

          <Link to={"/"} className="group relative">
            <span className="cursor-pointer transition group-hover:text-pink-500">
              Home
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link to={"/BasketItems"} className="group relative">
            <span className="cursor-pointer transition group-hover:text-pink-500">
              Basket
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link to={"/orders"} className="group relative">
            <span className="cursor-pointer transition group-hover:text-pink-500">
              Order
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <a href="#contact" className="group relative">
            <span className="cursor-pointer transition group-hover:text-pink-500">
              Contact
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
          </a>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* Search */}
          <div className="relative">
            <input
              className={`rounded-xl w-[180px] pl-4 pr-10 p-2 border border-pink-200
              focus:outline-none focus:ring-2 focus:ring-pink-400 transition
              ${isDarkmodeEnabled
                  ? "bg-[#242535] placeholder:text-zinc-400 text-white"
                  : "bg-white text-black"
                }`}
              placeholder="Search"
              type="search"
              value={searchterm}
              onChange={(e) => setSearchterm(e.target.value)}
            />
            <img
              className="absolute right-3 top-2.5 w-4 opacity-60"
              src="../src/assets/search.png"
            />
          </div>

          {/* Darkmode toggle */}
          <button
            className="w-12 h-7 flex items-center bg-pink-200 rounded-full p-1 cursor-pointer"
            onClick={toggleDarkmode}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 flex items-center justify-center
              ${isDarkmodeEnabled ? "translate-x-5" : ""}`}
            >
              {isDarkmodeEnabled ?
                <img src="src/assets/moon.png" className="w-3" /> :
                <img src="src/assets/sun.png" className="w-3" />}
            </div>
          </button>

          {/* Sign in */}
          <Link to={"/login"}>
            <button
              className="h-[38px] px-5 rounded-xl bg-gradient-to-r
              from-pink-400 to-pink-600 text-white font-semibold
              shadow-md hover:scale-105 hover:shadow-pink-300 transition"
            >
              Sign In
            </button>
          </Link>

        </div>

      </div>

    </div>
  )
}

export default Navbar