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
  const { accessToken, roles } = useTokens()
  const navigate = useNavigate()

  const isAdmin = roles?.includes("Admin")

  const [product, setProduct] = useState({})
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState([])

  const [images, setImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const [showEdit, setShowEdit] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [editImage, setEditImage] = useState(null)

  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    categoryId: "",
    price: 0,
    stockCount: 0,
  })

  const { id } = useParams()

  const isOutOfStock = product?.stockCount === 0

  const getProduct = async () => {
    const res = await fetch(`${API_URL}/Product/${id}`)
    const data = await res.json()

    setProduct(data)

    setForm({
      name: data.name,
      title: data.title,
      description: data.description,
      categoryId: data.categoryId,
      price: data.price,
      stockCount: data.stockCount,
    })

    getCategory(data.categoryId)

    if (data.attachments?.length) {
      const imgs = await Promise.all(
        data.attachments.map(async (att) => {
          const r = await fetch(`${API_URL}/Attachment/${att.id}/download`)
          const blob = await r.blob()

          return {
            id: att.id,
            url: URL.createObjectURL(blob),
          }
        })
      )
      setImages(imgs)
    } else {
      setImages([])
    }
  }

  const getCategory = async (id) => {
    const res = await fetch(`${API_URL}/Category/${id}`)
    const data = await res.json()
    setCategory(data.name)
  }

  const getCategories = async () => {
    try {
      const res = await api.get("/Category")
      setCategories(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const nextImage = () => setCurrentIndex((p) => (p + 1) % images.length)
  const prevImage = () => setCurrentIndex((p) => (p - 1 + images.length) % images.length)

  const addToBasket = async () => {
    if (!accessToken) return navigate("/login")

    if (isOutOfStock) return

    if (quantity > product.stockCount) {
      alert("Stock limit exceeded!")
      return
    }

    await api.post("/BasketItem", {
      productId: product.id,
      quantity,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const updateProduct = async () => {
    await api.put(`/Product/${id}`, {
      ...form,
      price: Number(form.price),
      stockCount: Number(form.stockCount),
    })

    setShowEdit(false)
    getProduct()
  }

  const uploadImage = async () => {
    try {
      if (!editImage) {
        alert("Select image!")
        return
      }

      const formData = new FormData()
      formData.append("file", editImage)

      await api.post(`/products/${id}/attachments`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setEditImage(null)
      getProduct()
    } catch (err) {
      console.error("UPLOAD ERROR:", err.response?.data || err)
    }
  }

  const deleteImage = async (imageId) => {
    try {
      await api.delete(`/Attachment/${imageId}`)
      setImages(prev => prev.filter(img => img.id !== imageId))
      setCurrentIndex(0)
    } catch (err) {
      console.error("DELETE ERROR:", err.response?.data || err)
    }
  }

  useEffect(() => {
    getProduct()
    getCategories()
  }, [id])

  return (
    <div className={`${isDarkmodeEnabled ? "bg-[#1c1814] text-white" : "bg-[#f4efe7] text-black"} min-h-screen`}>
      <Navbar />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 p-4 sm:p-10">

        {/* IMAGE */}
        <div className="relative group">
          <img
            src={images[currentIndex]?.url || "/no-image.png"}
            className="h-[250px] sm:h-[350px] md:h-[400px] w-full object-cover rounded-2xl"
          />

          {images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-2 top-1/2 bg-black/50 text-white px-2 py-1">‹</button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 bg-black/50 text-white px-2 py-1">›</button>
            </>
          )}
        </div>

        {/* INFO */}
        <div className="space-y-3 sm:space-y-4">
          <span className="text-xs bg-gray-200 px-3 py-1 rounded-full">{category}</span>

          <h1 className="text-xl sm:text-2xl font-bold">{product.name}</h1>

          <p className="text-lg sm:text-xl">{product.price?.toFixed(2)} AZN</p>

          <p className="text-sm sm:text-base">{product.description}</p>

          <p className="text-sm sm:text-base">
            Stock: {product.stockCount}
          </p>

          {isAdmin && (
            <div className="flex gap-3">
              <button onClick={() => setShowEdit(true)} className="border px-4 py-2">Edit</button>
              <button onClick={() => setShowImageModal(true)} className="border px-4 py-2">Images</button>
            </div>
          )}

          {!isAdmin && (
            <>
              {/* QUANTITY */}
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}
                  className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-black hover:text-white"
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  onClick={() =>
                    setQuantity(q =>
                      q < product.stockCount ? q + 1 : q
                    )
                  }
                  disabled={isOutOfStock}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center
                  ${!isOutOfStock && "hover:bg-black hover:text-white"}
                  ${isOutOfStock && "opacity-50 cursor-not-allowed"}
                  `}
                >
                  +
                </button>
              </div>

              {/* ADD BUTTON */}
              <button
                onClick={addToBasket}
                disabled={isOutOfStock}
                className={`relative overflow-hidden border text-sm tracking-wide px-3 py-2 mt-2 transition-all duration-300
                ${isDarkmodeEnabled
                  ? "border-[#c2b6a3] text-[#e7dccf]"
                  : "border-[#3a3835] text-[#3a3835]"
                }
                ${!added && !isOutOfStock && "hover:bg-black hover:text-white"}
                ${isOutOfStock && "opacity-50 cursor-not-allowed"}
                `}
              >
                <span className={`transition ${added ? "opacity-0" : "opacity-100"}`}>
                  {isOutOfStock ? "OUT OF STOCK" : "ADD TO BASKET"}
                </span>

                <span
                  className={`absolute inset-0 flex items-center justify-center transition
                  ${added ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                >
                  ✓ ADDED
                </span>
              </button>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Details