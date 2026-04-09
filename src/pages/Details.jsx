import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useDarkmode } from "../stores/store"
import { useTokens } from "../stores/tokenStore"
import api from "../utils/axios"

const API_URL = "http://localhost:5064/api"

const Details = () => {
  const { isDarkmodeEnabled } = useDarkmode()
  const { accessToken } = useTokens()
  const navigate = useNavigate()

  const [product, setProduct] = useState({})
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("/no-image.png")
  const [added, setAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const { id } = useParams()

  const getProduct = async () => {
    try {
      const res = await fetch(`${API_URL}/Product/${id}`)
      const data = await res.json()
      setProduct(data)

      getCategory(data.categoryId)

      if (data.attachments?.length > 0) {
        const imgRes = await fetch(`${API_URL}/Attachment/${data.attachments[0].id}/download`)
        const blob = await imgRes.blob()
        setImage(URL.createObjectURL(blob))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const addToBasket = async () => {
    if (!accessToken) {
      navigate("/login")
      return
    }

    try {
      await api.post("/BasketItem", {
        productId: product.id,
        quantity: quantity
      })

      setAdded(true)
      setTimeout(() => setAdded(false), 1500)

    } catch (error) {
      console.error(error)
    }
  }

  const getCategory = async (id) => {
    try {
      const res = await fetch(`${API_URL}/Category/${id}`)
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
    <div className={`w-full min-h-screen transition
      ${isDarkmodeEnabled ? "bg-[#1c1814] text-[#e6dccf]" : "bg-[#f4efe7] text-[#3a3835]"}`}>

      <Navbar />

      <div className="max-w-6xl  mx-auto px-25 py-14 grid md:grid-cols-2 gap-10 items-center">

        <div className="overflow-hidden rounded-2xl border">
          <img
            src={image}
            alt={product?.name}
            className="w-full h-[320px] object-cover rounded-2xl hover:scale-105 transition duration-500"
          />
        </div>

        <div className="space-y-4">

          <span className={`text-[11px] px-3 py-1 rounded-full inline-block
      ${isDarkmodeEnabled ? "bg-[#3a342c]" : "bg-[#e7ded2]"}`}>
            {category || "Uncategorized"}
          </span>

          <h1 className="text-2xl font-semibold leading-snug">
            {product?.name}
          </h1>

          <p className="text-xl font-medium">
            {product?.price?.toFixed(2)} AZN
          </p>

          <p className="text-sm opacity-80 leading-5 max-w-sm">
            {product?.description}
          </p>
           <p className="text-sm opacity-80 leading-5 max-w-sm">
           StockCount: {product?.stockCount}
          </p>

          <div className="flex items-center gap-3 mt-2">

            <button
              onClick={() => setQuantity(q => (q > 1 ? q - 1 : 1))}
              className="w-9 h-9 border rounded-lg hover:opacity-70"
            >
              -
            </button>

            <span className="text-base font-semibold">
              {quantity}
            </span>

            <button
              onClick={() =>
                setQuantity(q =>
                  product?.stockCount ? (q < product.stockCount ? q + 1 : q) : q
                )
              }
              className="w-9 h-9 border rounded-lg hover:opacity-70"
            >
              +
            </button>

          </div>

          <button
            onClick={addToBasket}
            className={`relative overflow-hidden mt-3 px-6 py-2.5 text-sm rounded-lg transition-all duration-300
      ${added
                ? "bg-[#3a342c] text-white scale-105"
                : "border border-[#d6ccc2] hover:bg-[#3a3835] hover:text-white"
              }`}
          >
            <span className={`${added ? "opacity-0" : "opacity-100"} transition`}>
              Add to Basket
            </span>

            <span
              className={`absolute inset-0 flex items-center justify-center transition
        ${added ? "opacity-100" : "opacity-0"}`}
            >
              ✓ Added
            </span>
          </button>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Details