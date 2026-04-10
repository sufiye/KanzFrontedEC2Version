import { Link, useNavigate, useLocation } from "react-router-dom"
import { useDarkmode } from "../stores/store"
import { useTokens } from "../stores/tokenStore"
import { useEffect, useState } from "react"
import api from "../utils/axios"

const Navbar = ({ searchterm, setSearchterm, selectedCategory, setSelectedCategory }) => {
  const { toggleDarkmode, isDarkmodeEnabled } = useDarkmode()
  const { accessToken, clearTokens } = useTokens()
  const navigate = useNavigate()
  const location = useLocation()

  const [categories, setCategories] = useState([])

  // 🔥 yalnız homepage olub olmadığını yoxla
  const isHomePage = location.pathname === "/"

  // 🔹 GET CATEGORIES
  const getCategories = async () => {
    try {
      const res = await api.get("/Category")
      setCategories(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isHomePage) {
      getCategories()
    }
  }, [isHomePage])

  return (
    <div className={`w-full flex justify-between items-center px-12 py-6 text-sm transition
      ${isDarkmodeEnabled
        ? "bg-[#1c1814] text-[#e6dccf]"
        : "bg-[#f4efe7] text-[#3a3835]"
      }`}>

      <h1 className="text-xl tracking-[3px] font-semibold">
        Kanz
      </h1>

      <div className="flex items-center gap-6 tracking-wide">

        <Link to="/">Home</Link>
        <Link to="/BasketItems">Basket</Link>
        <Link to="/orders">Order</Link>

        {/* 🔥 SADECE HOMEPAGE */}
        {isHomePage && (
          <>
            {/* CATEGORY */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-3 py-2 text-xs rounded-lg border
              ${isDarkmodeEnabled
                ? "bg-[#26221d] border-[#3a342c] text-white"
                : "bg-white border-[#ddd] text-black"
              }`}
            >
              <option value="">All</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* SEARCH */}
            <input
              placeholder="Search"
              type="search"
              value={searchterm}
              onChange={(e) => setSearchterm(e.target.value)}
              className={`px-4 py-2 text-xs rounded-lg border
              ${isDarkmodeEnabled
                ? "bg-[#26221d] border-[#3a342c] text-white"
                : "bg-white border-[#ddd] text-black"
              }`}
            />
          </>
        )}

      </div>

      <div className="flex items-center gap-5">

        <button onClick={toggleDarkmode}>
          {isDarkmodeEnabled ? "☀️" : "🌙"}
        </button>

        {accessToken ? (
          <button
            onClick={() => {
              clearTokens()
              navigate("/login")
            }}
            className="border px-5 py-2 text-xs hover:bg-black hover:text-white"
          >
            LOGOUT
          </button>
        ) : (
          <Link to="/login">
            <button className="border px-5 py-2 text-xs hover:bg-black hover:text-white">
              SIGN IN
            </button>
          </Link>
        )}

      </div>
    </div>
  )
}

export default Navbar