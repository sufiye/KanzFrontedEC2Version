import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useState, useEffect } from "react"
import api from "../utils/axios"
import { useDarkmode } from "../stores/store"
import { useNavigate } from "react-router-dom"

const API_URL = "http://localhost:5064/api"

const Order = () => {
  const { isDarkmodeEnabled } = useDarkmode()
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState({})
  const navigate = useNavigate()

  // 🔹 PRODUCT FETCH
  const getProductById = async (id) => {
    try {
      if (products[id]) return

      const res = await fetch(`${API_URL}/Product/${id}`)
      const data = await res.json()

      setProducts(prev => ({
        ...prev,
        [id]: data
      }))
    } catch (error) {
      console.error("PRODUCT ERROR:", error)
    }
  }

  // 🔹 GET ORDERS
  const getOrders = async () => {
    try {
      const res = await api.get("/Order")
      const data = res.data
console.log(data);

      const orderList = Array.isArray(data) ? data : [data]

      setOrders(orderList)

      // 🔥 product preload
      orderList.forEach(order => {
        order.items?.forEach(item => {
          getProductById(item.productId)
        })
      })

    } catch (error) {
      console.error("ORDER ERROR:", error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("tokens")

    if (!token) {
      navigate("/login")
      return
    }

    getOrders()
  }, [])

  return (
    <div className={`min-h-screen w-full ${
      isDarkmodeEnabled 
        ? "bg-[#1c1814] text-[#e6dccf]" 
        : "bg-[#f4efe7] text-[#3a3835]"
    }`}>
      
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-5">

        <h1 className="text-2xl font-semibold mb-6 tracking-wide">
          My Orders ({orders.length})
        </h1>

        {orders.length === 0 ? (
          <p className="opacity-70">No orders found</p>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div 
                key={order.id}
                className={`p-5 rounded-xl border shadow-sm hover:shadow-lg transition
                ${isDarkmodeEnabled 
                  ? "bg-[#26221d] border-[#3a342c]" 
                  : "bg-white border-[#e5e0d8]"}`}
              >

                {/* 🔹 HEADER */}
                <div className="flex justify-between mb-3">
                  <span className="text-sm opacity-70">
                    Order ID: {order.id}
                  </span>

                  <span className={`text-xs px-3 py-1 rounded-full
                    ${order.status === "Pending" 
                      ? "bg-[#3a342c] text-[#e6dccf]" 
                      : "bg-green-500 text-white"}`}>
                    {order.status}
                  </span>
                </div>

                <p className="text-sm opacity-80">
                  {new Date(order.orderDate).toLocaleString()}
                </p>

                <p className="font-semibold mt-1">
                  Total: {order.totalPrice} AZN
                </p>

                {/* 🔹 ITEMS */}
                <div className="mt-4 space-y-3">
                  {order.items?.map((item, index) => {
                    const product = products[item.productId]

                    return (
                      <div 
                        key={index}
                        className="flex justify-between items-center border-t pt-3 text-sm"
                      >

                        {/* 🔥 PRODUCT */}
                        <div className="flex items-center gap-3">

                          <img
                            src={
                              product?.attachments?.length > 0
                                ? `${API_URL}/Attachment/${product.attachments[0].id}/download`
                                : "/no-image.png"
                            }
                            className="w-12 h-12 object-cover rounded-lg"
                          />

                          <div className="flex flex-col">
                            <span className="font-medium">
                              {product?.name || "Loading..."}
                            </span>
                            <span className="text-xs opacity-60">
                              {item.price} AZN
                            </span>
                          </div>

                        </div>

                        {/* 🔹 QTY */}
                        <span className="text-sm font-medium">
                          x{item.quantity}
                        </span>

                      </div>
                    )
                  })}
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      <Footer />
    </div>
  )
}

export default Order