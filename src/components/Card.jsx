import { Link } from "react-router-dom"
import { useDarkmode } from "../stores/store"
import { useEffect } from "react"
import api from "../utils/axios"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
const Card = ({ card, deleteblog }) => {
    const { isDarkmodeEnabled } = useDarkmode()
    const navigate = useNavigate()
    const location = useLocation()

    const deleteBlog = async () => {
        try {
            const { data } = await api.delete(`/${card._id}`)
            console.log(data)

        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {

    }, [])
    return (
        <>

            <Link to={location.pathname === "/" || location.pathname.startsWith("/category") ? `/details/${card._id}` : ''}>
                <div className={`w-[300px] h-full  p-3 border rounded-2xl space-y-2 shadow-sm  flex flex-col ${isDarkmodeEnabled ? "border-zinc-800" : "border-zinc-200 "}
                                 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                    <img className="w-full h-[200px] object-cover rounded-xl" src={card.image} alt="" />
                    {deleteblog &&
                        <><div className="absolute">
                            <div className={`border rounded-full w-fit p-1 relative -right-59 top-2 cursor-alias ${isDarkmodeEnabled ? "bg-[#181A2A] border-white" : " bg-white border-black"}`} onClick={deleteBlog}>

                                {isDarkmodeEnabled ? <img className="h-5 w-5 " src="src\assets\trashWhite.png" alt="" /> :
                                    <img className="h-5 w-5 " src="src\assets\trash.png" alt="" />}
                            </div>
                        </div>
                        </>}

                    <div className={`w-fit p-1 rounded-sm ${isDarkmodeEnabled ? "bg-slate-800" : "bg-zinc-100 "}`}><p className={`text-xs  font-medium ${isDarkmodeEnabled ? "text-[#4B6BFB]" : "text-blue-400"}`}>{card.category}</p></div>
                    <h1 className={`text-xl font-medium line-clamp-2 ${isDarkmodeEnabled ? "text-white" : "text-black"}`} >{card.title}</h1>
                    <div className="flex gap-3  text-xs text-zinc-400">
                        <button onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            navigate(`/myblogs/${card.user._id}`)
                        }} className="cursor-alias">{card.user.email}</button>
                        <p>{new Date(card.createdAt).toLocaleDateString()}</p>
                    </div>

                </div></Link>

        </>
    )
}

export default Card