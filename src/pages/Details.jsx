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

        <div className="relative group">
          <img
            src={images[currentIndex]?.url || "/no-image.png"}
            className="h-[250px] sm:h-[350px] md:h-[400px] w-full object-cover rounded-2xl"
          />

          {images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-2 top-1/2 bg-black/50 text-white px-2 sm:px-3 py-1">‹</button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 bg-black/50 text-white px-2 sm:px-3 py-1">›</button>
            </>
          )}
        </div>

        <div className="space-y-3 sm:space-y-4">
          <span className="text-xs bg-gray-200 px-3 py-1 rounded-full text-brown-300">{category}</span>
          <h1 className="text-xl sm:text-2xl font-bold">{product.name}</h1>
          <p className="text-lg sm:text-xl">{product.price?.toFixed(2)} AZN</p>
          <p className="text-sm sm:text-base">{product.description}</p>
          <p className="text-sm sm:text-base">Stock: {product.stockCount}</p>

          {isAdmin && (
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setShowEdit(true)} className="border px-4 py-2">Edit</button>
              <button onClick={() => setShowImageModal(true)} className="border px-4 py-2">Images</button>
            </div>
          )}

          {!isAdmin && (
            <>
              <div className="flex gap-3 items-center">

                <button
                  onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}
                  className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-black hover:text-white"
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  onClick={() => setQuantity(q => q + 1)}       
                  className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-black hover:text-white"
                >
                  +
                </button>

              </div>

              <button
                onClick={addToBasket}
                className={`relative overflow-hidden border text-sm tracking-wide px-3 py-2 mt-2 transition-all duration-300
          ${isDarkmodeEnabled
                    ? "border-[#c2b6a3] text-[#e7dccf]"
                    : "border-[#3a3835] text-[#3a3835]"
                  }
          ${!added && "hover:bg-black hover:text-white"}
          `}
              >
                <span className={`transition ${added ? "opacity-0" : "opacity-100"}`}>
                  ADD TO BASKET
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

      {showEdit && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center px-4">
          <div className="bg-white w-full max-w-[500px] p-6 rounded-2xl text-black space-y-5">

            <h2 className="text-xl font-semibold">Edit Product</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <input className="border p-2" placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input className="border p-2" placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <textarea className="border p-2 sm:col-span-2" placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />

              <select className="border p-2"
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              >
                <option value="">Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              <input type="number" className="border p-2"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />

              <input type="number" className="border p-2"
                value={form.stockCount}
                onChange={(e) => setForm({ ...form, stockCount: e.target.value })}
              />

            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button onClick={() => setShowEdit(false)} className="border px-4 py-2">Cancel</button>
              <button onClick={updateProduct} className="bg-black text-white px-4 py-2">Save</button>
            </div>

          </div>
        </div>
      )}

      {showImageModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center px-4">

          <div className="bg-white p-6 w-full max-w-[500px] rounded-2xl text-black space-y-4">

            <h2 className="font-semibold text-lg">Manage Images</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {images.map((img, index) => (
                <div key={img.id} className="relative group cursor-pointer" onClick={() => setCurrentIndex(index)}>
                  <img src={img.url} className="h-[90px] sm:h-[100px] w-full object-cover rounded" />

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteImage(img.id)
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <input type="file" onChange={(e) => setEditImage(e.target.files[0])} />

            <button onClick={uploadImage} className="bg-green-500 text-white py-2 w-full rounded">
              Upload
            </button>

            <button onClick={() => setShowImageModal(false)} className="border py-2 w-full rounded">
              Close
            </button>

          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Details