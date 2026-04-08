import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useDarkmode } from "../stores/store"
import api from "../utils/axios"

const API_URL = "http://localhost:5064/api"

const Details = () => {
  const { isDarkmodeEnabled } = useDarkmode()
  const [product, setProduct] = useState({})
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("/no-image.png")
  const { id } = useParams()


  const getProduct = async () => {
    try {
      const res = await fetch(`${API_URL}/Product/${id}`)
      if (!res.ok) throw new Error("Failed to fetch product")
      const data = await res.json()
      setProduct(data)
      console.log(data);

      getCategory(data.categoryId)

      if (data.attachments?.length > 0) {
        const imgRes = await fetch(`${API_URL}/Attachment/${data.attachments[0].id}/download`)

        if (imgRes.ok) {
          const blob = await imgRes.blob()
          const imageUrl = URL.createObjectURL(blob)
          setImage(imageUrl)
        }

      }
    } catch (error) {
      console.error(error)
    }
  }

const addToBasket = async () => {
  try {
    const res = await api.post("/BasketItem", {
      productId: product.id,
      quantity: 1
    })

    console.log(res.data)
    alert("Product added to basket 🛒")

  } catch (error) {
    console.error(error)
  }
}

  const getCategory = async (id) => {
    try {
      const res = await fetch(`${API_URL}/Category/${id}`);
      const data = await res.json()

      setCategory(data.name)
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    getProduct()
  }, [id])

  return (
    <div className={`w-full min-h-screen ${isDarkmodeEnabled ? "bg-[#181A2A]" : "bg-white"}`}>
      <Navbar />

      <div className="max-w-7xl mx-20 px-5 py-20 flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <img
            src={image}
            alt={product?.name}
            className="w-full h-[340px] object-cover rounded-2xl shadow-lg transition-all hover:scale-105 duration-300"
          />
        </div>

        <div className="flex-1 flex flex-col gap-5">

          <div className={`inline-block px-4 py-1 rounded-full text-sm font-semibold 
            ${isDarkmodeEnabled ? "bg-pink-600 text-white" : "bg-pink-100 text-pink-700"}`}>
            {category || "Uncategorized"}
          </div>

          <h1 className={`text-4xl font-bold ${isDarkmodeEnabled ? "text-white" : "text-black"}`}>
            {product?.name}
          </h1>

          <p className={`text-2xl font-semibold ${isDarkmodeEnabled ? "text-white" : "text-pink-700"}`}>
            {product?.price?.toFixed(2)} azn
          </p>

          <p className={`text-base text-justify ${isDarkmodeEnabled ? "text-zinc-300" : "text-zinc-700"}`}>
            {product?.description || "No description available for this product."}
          </p>
          <p className={`text-base text-justify ${isDarkmodeEnabled ? "text-zinc-300" : "text-zinc-700"}`}>
            <span className="font-semibold">Stock Count:</span>{" "}
            {product?.stockCount != null ? product.stockCount : "No stock available"}
          </p>
          <button
          onClick={addToBasket}
            className={`mt-5 px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md
              ${isDarkmodeEnabled
                ? "bg-gray-800 text-white hover:bg-pink-700 hover:shadow-md"
                : "bg-white text-gray-900 hover:bg-pink-700 hover:text-white hover:shadow-md"
              }`}
          >
            Add to Basket
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Details