
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDarkmode } from '../stores/store'
const Card = ({product}) => {
  console.log(product);
  
  //  const [count,setCount] = useState(0)
  const {isDarkmodeEnabled} = useDarkmode()
  return (
  <Link to={`/details/${product._id} ` }  >
     <div className={`${isDarkmodeEnabled ? "text-white":"text-black"} relative min-w-[300px] w-full p-4 border-2 border-gray-300 shadow-md rounded-md `}>
        <img className='w-full h-[250px] object-contain' src={product.image ? product.image :product.images[0]} alt="" />
        <h1 className='font-semibold text-2xl mt-3 '>{product.title}</h1>
        <p className='text-sm my-4'>{product.description}</p>
        <p className='text-red-700'>{product.price}{product.currency}</p>

         {/* <div  className='w-fit absolute -bottom-2 right-3 flex justify-center items-center gap-5 py-5 '>
      <button onClick={()=>{
        setCount(prevState => prevState - 1)
        }} className='flex items-center justify-center size-10 bg-red-600 text-3xl text-white'>-</button>
      <p className='text-2xl '>{count}</p>
      <button onClick={()=>{
        setCount(prevState => prevState + 1)
        }} className='flex items-center justify-center size-10 bg-green-600 text-3xl text-white'>+</button>
      
    </div> */}
      </div>
      </Link>
  )
}

export default Card