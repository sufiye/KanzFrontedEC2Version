import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
    const[product,setProduct] = useState({})
    
    const {id} = useParams() 

    const getProductDetails = async ()=>{
        try {
            const res = await fetch(`https://ilkinibadov.com/api/v1/products/${id}/details`)

            if (res.ok) {
                 const data = await res.json()
                 console.log(data);
                 
                  setProduct(data)  
            }
         

        } catch (error) {
            
        }
    }

 useEffect(()=>{
        getProductDetails();
 },[id])   
  return (
    <div className='w-full h-screen flex justify-center items-center'>      
       <div>
         <p className="text-red-900 text-2xl font-semibold">{product.title}</p>
        <p className="text-cyan-900 text-2xl font-semibold">{product.description}</p>
       </div>
    </div>
  )
}

export default Details