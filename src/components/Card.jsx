import { Link } from "react-router-dom"
import { useDarkmode } from "../stores/store"
const Card = ({card}) => {
  const {isDarkmodeEnabled} = useDarkmode()

    return (
        <>
        
        <Link to={`/details/${card._id}`}>
            <div className={`w-[300px] h-full  p-3 border rounded-2xl space-y-2 shadow-sm  flex flex-col ${isDarkmodeEnabled?"border-zinc-800":"border-zinc-200 "}
             overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                <img className="w-full h-[200px] object-cover rounded-xl" src={card.image} alt="" />
                <div className={`w-fit p-1 rounded-sm ${isDarkmodeEnabled?"bg-slate-800":"bg-zinc-100 "}`}><p className={`text-xs  font-medium ${isDarkmodeEnabled?"text-[#4B6BFB]" :"text-blue-400"}`}>{card.category}</p></div>
                <h1 className={`text-xl font-medium line-clamp-2 ${isDarkmodeEnabled?"text-white":"text-black"}`} >{card.title}</h1>
                <div className="flex gap-3  text-xs text-zinc-400">
                    <Link  to={`/myblogs/${card?.user?._id}`}><button className="cursor-alias">{card.user.email}</button></Link>
                    <p>{new Date(card.createdAt).toLocaleDateString()}</p>
                </div>

            </div></Link>
            
        </>
    )
}

export default Card