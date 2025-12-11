
import { useState,useEffect } from 'react'
import Card from '../components/Card'
import { useDarkmode } from '../stores/store'
import api from "../utils/axios"
import { useTranslation } from 'react-i18next'
import LanguageSelector from '../components/languageSelector'


const Products = () => {
  const[searchterm,setSearchterm] = useState("")
  const [products,setProducts] = useState([])
  const {toggleDarkmode,isDarkmodeEnabled} = useDarkmode()
  const {t} = useTranslation()

  const getProducts = async () => {
    try {
        const { data, statusText } = await api.get(searchterm.length >= 3 ? `https://ilkinibadov.com/api/v1/search?searchterm=${searchterm}` : "https://ilkinibadov.com/api/v1/products")
        console.log(data)
        if (statusText === "OK") {
            setProducts(searchterm.length >= 3 ? data.content : data.products)
        }
    } catch (error) {
        console.error(error)
    }
}

useEffect(()=>{
  getProducts()
},[searchterm])


  return (

    <>
    <div className={`${isDarkmodeEnabled ? "bg-gray-900":"bg-white" } transition-all duration-400 `}>
   <h1 className={` m-5 text-2xl`}>{t("loginTitle")}</h1>
    <div className='w-full flex justify-center gap-2 py-5 '>
     <input className={`${isDarkmodeEnabled? "placeholder:text-white text-white ":"placeholder:text-zinc-500 text-black"} border-2 border-zinc-300 p-3 rounded-sm min-w-[300px]`} placeholder='Search for any product...' value={searchterm} type="text" onChange={(e)=>{
        setSearchterm(e.target.value)
      }} />
      <button className='bg-cyan-900 text-white rounded-sm px-2 just' onClick={toggleDarkmode}>{isDarkmodeEnabled ?"Disable Darkmode":" Enable Darkmode"}</button>
      <LanguageSelector/>
    </div>

   <div className='w-full h-full grid grid-cols-4 gap-5 p-5'>
      {products.length ? products.map(product =>  <Card product={product}/>):"No products"}
    </div>
    
    </div>
    </>
  )
}

export default Products