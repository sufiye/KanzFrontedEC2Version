import { Link, useNavigate } from "react-router-dom"
import { useDarkmode } from "../stores/store"
import { useTokens } from "../stores/tokenStore"

const Navbar = ({ searchterm, setSearchterm }) => {
  const { toggleDarkmode, isDarkmodeEnabled } = useDarkmode()
  const { accessToken, clearTokens } = useTokens()
  const navigate = useNavigate()

  return (
    <div
      className={`w-full flex justify-between items-center px-12 py-6 text-sm transition
      ${
        isDarkmodeEnabled
          ? "bg-[#1c1814] text-[#e6dccf]"
          : "bg-[#f4efe7] text-[#3a3835]"
      }`}
    >

      <h1 className="text-xl tracking-[3px] font-semibold">
        Kanz
      </h1>

      <div className="flex items-center gap-10 tracking-wide">

        <Link className="hover:opacity-60 transition" to="/">Home</Link>
        <Link className="hover:opacity-60 transition" to="/BasketItems">Basket</Link>
        <Link className="hover:opacity-60 transition" to="/orders">Order</Link>

        <input
           placeholder="Search"
              type="search"
              value={searchterm}
              onChange={(e) => setSearchterm(e.target.value)}
          className={`ml-6 px-4 py-2 text-xs rounded-lg border transition
          focus:outline-none
          ${
            isDarkmodeEnabled
              ? "bg-[#26221d] border-[#3a342c] text-white placeholder:text-[#a8a093]"
              : "bg-white border-[#ddd] text-black placeholder:text-gray-500"
          }`}
        />

      </div>

      <div className="flex items-center gap-5">

        <button
          onClick={toggleDarkmode}
          className="opacity-70 hover:opacity-100 transition"
        >
          {isDarkmodeEnabled ? "☀️" : "🌙"}
        </button>

        {accessToken ? (
          <button
            onClick={() => {
              clearTokens()
              navigate("/login") 
            }}
            className="border px-5 py-2 text-xs tracking-wide hover:bg-black hover:text-white transition"
          >
            LOGOUT
          </button>
        ) : (
          <Link to="/login">
            <button className="border px-5 py-2 text-xs tracking-wide hover:bg-black hover:text-white transition">
              SIGN IN
            </button>
          </Link>
        )}

      </div>
    </div>
  )
}

export default Navbar