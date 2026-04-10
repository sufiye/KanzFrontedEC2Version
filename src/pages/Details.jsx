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

  // 🔥 SLIDER STATES
  const [images, setImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const [added, setAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const [showEdit, setShowEdit] = useState(false)
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

  // 🔹 IMAGE SLIDER FUNCS
  const nextImage = () => {
    if (images.length === 0) return
    setCurrentIndex(prev => (prev + 1) % images.length)
  }

  const prevImage = () => {
    if (images.length === 0) return
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length)
  }

  // 🔹 GET PRODUCT
  const getProduct = async () => {
    try {
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

      // 🔥 MULTIPLE IMAGES
      if (data.attachments?.length > 0) {
        const imgs = await Promise.all(
          data.attachments.map(async (att) => {
            const imgRes = await fetch(`${API_URL}/Attachment/${att.id}/download`)
            const blob = await imgRes.blob()
            return URL.createObjectURL(blob)
          })
        )

        setImages(imgs)
        setCurrentIndex(0)
      } else {
        setImages([])
        setCurrentIndex(0)
      }

    } catch (error) {
      console.error(error)
    }
  }

  // 🔹 CATEGORY
  const getCategory = async (id) => {
    try {
      const res = await fetch(`${API_URL}/Category/${id}`)
      const data = await res.json()
      setCategory(data.name)
    } catch (error) {
      console.error(error)
    }
  }

  // 🔹 ADD TO BASKET
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

  // 🔹 UPDATE PRODUCT
  const updateProduct = async () => {
    try {
      await api.put(`/Product/${id}`, {
        ...form,
        price: Number(form.price),
        stockCount: Number(form.stockCount),
      })

      alert("Product updated ✅")
      getProduct()

    } catch (error) {
      console.error("UPDATE ERROR:", error.response?.data || error)
    }
  }

  // 🔹 UPLOAD IMAGE
  const uploadImage = async () => {
    try {
      if (!editImage) {
        alert("Select image!")
        return
      }

      const formData = new FormData()
      formData.append("file", editImage)

      await api.post(`/product/${id}/attachments`, formData)

      alert("Image uploaded ✅")
      getProduct()

    } catch (error) {
      console.error("UPLOAD ERROR:", error.response?.data || error)
    }
  }

  useEffect(() => {
    getProduct()
  }, [id])

  return (
    <div className={`w-full min-h-screen transition
      ${isDarkmodeEnabled ? "bg-[#1c1814] text-[#e6dccf]" : "bg-[#f4efe7] text-[#3a3835]"}`}>

      <Navbar />

      <div className="max-w-6xl mx-auto px-25 py-14 grid md:grid-cols-2 gap-10 items-start">

        {/* 🔥 IMAGE SLIDER */}
        <div className="relative overflow-hidden rounded-2xl border group">

          <img
            src={images.length ? images[currentIndex] : "/no-image.png"}
            className="w-full h-[400px] object-cover rounded-2xl transition duration-500"
          />

          {/* LEFT */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 
              bg-black/40 text-white w-10 h-10 rounded-full 
              flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition"
            >
              ‹
            </button>
          )}

          {/* RIGHT */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 
              bg-black/40 text-white w-10 h-10 rounded-full 
              flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition"
            >
              ›
            </button>
          )}

        </div>

        {/* 🔥 PRODUCT INFO */}
        <div className="space-y-4">

          <span className={`text-[11px] px-3 py-1 rounded-full
            ${isDarkmodeEnabled ? "bg-[#3a342c]" : "bg-[#e7ded2]"}`}>
            {category || "Uncategorized"}
          </span>

          <h1 className="text-2xl font-semibold">
            {product?.name}
          </h1>

          <p className="text-xl">
            {product?.price?.toFixed(2)} AZN
          </p>

          <p className="text-sm opacity-80">
            {product?.description}
          </p>

          <p>Stock: {product?.stockCount}</p>

          {isAdmin && (
            <button
              onClick={() => setShowEdit(true)}
              className="border px-6 py-2 text-xs hover:bg-black hover:text-white"
            >
              UPDATE PRODUCT
            </button>
          )}

          {!isAdmin && (
            <>
              <div className="flex items-center gap-4">

                <button
                  onClick={() => setQuantity(q => (q > 1 ? q - 1 : 1))}
                  className="w-10 h-10 rounded-full border hover:bg-red-500 hover:text-white"
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 rounded-full border hover:bg-green-500 hover:text-white"
                >
                  +
                </button>

              </div>

              <button
                onClick={addToBasket}
                className={`px-6 py-2 rounded-xl border transition
                ${added ? "bg-green-500 text-white" : ""}`}
              >
                {added ? "✓ Added" : "Add to Basket"}
              </button>
            </>
          )}

        </div>
      </div>

      {/* 🔥 MODAL */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 w-[400px] text-black">

            <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
            <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} />
            <input value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />

            <input type="file" onChange={(e)=>setEditImage(e.target.files[0])} />

            <button onClick={updateProduct}>Update</button>
            <button onClick={uploadImage}>Upload Image</button>

          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Details