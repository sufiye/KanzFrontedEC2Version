import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useDarkmode } from "../stores/store";
import { useTokens } from "../stores/tokenStore";
import api from "../utils/axios";
import toast from "react-hot-toast";


const API_URL = "http://localhost:5064/api";

const BasketItems = () => {
  const { isDarkmodeEnabled } = useDarkmode();
  const { accessToken } = useTokens();
  const [basketItems, setBasketItems] = useState([]);

  // Şəkil fetch funksiyası
  const fetchImage = async (attachmentId) => {
    try {
      const res = await fetch(`${API_URL}/Attachment/${attachmentId}/download`);
      if (!res.ok) throw new Error("Failed to fetch image");
      const blob = await res.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error(error);
      return "/no-image.png";
    }
  };

  // Basket items yükləmək
  const getBasketItems = async () => {
    if (!accessToken) return;
    try {
      const { data } = await api.get("/BasketItem", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log(data);

      // Hər item üçün şəkil əlavə et
      const itemsWithImages = await Promise.all(
        (data || []).map(async (item) => {
          const imageUrl = item.product?.attachments?.length
            ? await fetchImage(item.product.attachments[0].id)
            : "/no-image.png";
          return { ...item, imageUrl };
        })
      );

      setBasketItems(itemsWithImages);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load basket items");
    }
  };

  // Basket item silmək
  const removeFromBasket = async (id) => {
    if (!accessToken) return;
    try {
      await api.delete(`/BasketItem/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setBasketItems(prev => prev.filter(item => item.id !== id));
      toast.success("Item removed");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item");
    }
  };

  const totalPrice = basketItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1),
    0
  );

  const makeOrder = () => {
    toast.success(`Order placed! Total: ${totalPrice.toFixed(2)} AZN`);
  };

  useEffect(() => {
    if (!accessToken) return;
    getBasketItems();
  }, [accessToken]);

  return (
    <div className={`w-full min-h-screen ${isDarkmodeEnabled ? "bg-[#181A2A]" : "bg-white"}`}>
      <Navbar />

      <div className="max-w-6xl mx-auto py-20 px-4">
        <h1 className={`text-3xl font-bold mb-8 ${isDarkmodeEnabled ? "text-white" : "text-black"}`}>
          My Basket
        </h1>

        {basketItems.length === 0 ? (
          <p className={`${isDarkmodeEnabled ? "text-zinc-300" : "text-gray-700"}`}>
            Your basket is empty.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-6">
              {basketItems.map((item) => (
                <div key={item.id} className={`relative border rounded-xl p-4 flex flex-col items-center ${isDarkmodeEnabled ? "border-zinc-700 bg-[#232536]" : "border-gray-200 bg-white"}`}>


                  <button
                    onClick={() => removeFromBasket(item.id)}
                    className={`absolute top-2 right-2 p-2 rounded-full border transition
    ${isDarkmodeEnabled
                        ? "bg-pink-600 border-gray-600 hover:bg-pink-800"
                        : "bg-pink-600 border-gray-200 hover:bg-pink-700"
                      }`}
                  >
                      {isDarkmodeEnabled ? (
            <img src="/src/assets/trash.white.png" className="w-3" />
          ) : (
            <img src="/src/assets/trash.lo.png" className="w-3" />
          )}
                  </button>

                  <img
                    src={item.imageUrl}
                    alt={item.product?.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className={`text-lg font-semibold mb-2 ${isDarkmodeEnabled ? "text-white" : "text-black"}`}>
                    {item.product?.name}
                  </h2>
                  <p className={`text-sm mb-2 ${isDarkmodeEnabled ? "text-zinc-300" : "text-gray-700"}`}>
                    {item.product?.description}
                  </p>
                  <p className={`font-bold mb-2 ${isDarkmodeEnabled ? "text-white" : "text-black"}`}>
                    {item.product?.price?.toFixed(2)} AZN
                  </p>
                  <p className={`text-sm mb-2 ${isDarkmodeEnabled ? "text-zinc-400" : "text-gray-500"}`}>
                    Quantity: {item.quantity || 1}
                  </p>
                </div>
              ))}
            </div>

            {/* Total and Make Order */}
            <div className="mt-8 flex justify-between items-center p-4 border-t border-gray-300">
              <span className={`text-xl font-bold ${isDarkmodeEnabled ? "text-white" : "text-black"}`}>
                Total: {totalPrice.toFixed(2)} AZN
              </span>
              <button
                onClick={makeOrder}
                className={`px-6 py-3 rounded-xl font-bold text-white ${isDarkmodeEnabled ? "bg-pink-600 hover:bg-pink-500" : "bg-pink-500 hover:bg-pink-600"
                  } transition`}
              >
                Make Order
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BasketItems;