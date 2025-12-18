import { Link } from "react-router-dom"

const Card = ({card}) => {

    return (
        <>
        
        <Link to={`/details/${card._id}`}>
            <div className=" w-[300px]  p-3 border border-zinc-200 rounded-2xl space-y-2 shadow-sm
             overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <img className="w-full h-[200px]  rounded-xl" src={card.image} alt="" />
                <div className="bg-zinc-100 w-fit p-1 rounded-sm"><p className="text-xs text-blue-400 font-medium">{card.category}</p></div>
                <h1 className="text-xl font-medium" >{card.title}</h1>
                <div className="flex gap-3  text-xs text-zinc-400">
                    <p>{card.user.email}</p>
                    <p>{card.createdAt}</p>
                </div>

            </div></Link>
            
        </>
    )
}

export default Card