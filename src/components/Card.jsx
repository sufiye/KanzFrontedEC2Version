import { Link } from "react-router-dom"

const Card = ({card}) => {


    return (
        <>
        
        <Link to={`/details/${card._id}`}>
            <div className=" w-[300px] h-full  p-3 border border-zinc-200 rounded-2xl space-y-2 shadow-sm  flex flex-col
             overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <img className="w-full h-[200px] object-cover rounded-xl" src={card.image} alt="" />
                <div className="bg-zinc-100 w-fit p-1 rounded-sm"><p className="text-xs text-blue-400 font-medium">{card.category}</p></div>
                <h1 className="text-xl font-medium line-clamp-2" >{card.title}</h1>
                <div className="flex gap-3  text-xs text-zinc-400">
                    <Link  to={`/myblogs/${card?.user?._id}`}><button className="cursor-alias">{card.user.email}</button></Link>
                    <p>{new Date(card.createdAt).toLocaleDateString()}</p>
                </div>

            </div></Link>
            
        </>
    )
}

export default Card