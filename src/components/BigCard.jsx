import { Link } from "react-router-dom"
import { useDarkmode } from "../stores/store"
import { useNavigate } from "react-router-dom"
const BigCard = ({ card }) => {
  const { isDarkmodeEnabled } = useDarkmode()
  const navigate = useNavigate()
  return (
    <Link to={`/details/${card._id}`} className="col-span-3">
      <div className={`relative h-[420px] rounded-3xl shadow-lg mb-10 
       overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg`}>


        <img
          src={card.image}
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-black/40"></div>


        <div className="absolute bottom-6 left-6 text-white max-w-xl space-y-3">
          <span className={` text-xs px-3 py-1 rounded-sm ${isDarkmodeEnabled ? "bg-[#4B6BFB]" : "bg-blue-500 "}`}>
            {card.category}
          </span>

          <h1 className="text-3xl font-bold  line-clamp-2">
            {card.title}
          </h1>

          <div className="text-sm opacity-80 flex gap-4">
            <button onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              navigate(`/myblogs/${card.user._id}`)
            }} className="cursor-alias">{card.user.email}</button>
            <p>{new Date(card.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

      </div>
    </Link>
  )
}

export default BigCard
