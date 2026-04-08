import { useState, useEffect } from "react";
import { useDarkmode } from "../stores/store";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useTokens } from "../stores/tokenStore";


const API_URL = "http://localhost:5064/api";

const CartCard = ({ product }) => {
  const [image, setImage] = useState("/no-image.png");
  const { isDarkmodeEnabled } = useDarkmode();
  const navigate = useNavigate();

  const { accessToken } = useTokens();

  async function imageGet(id) {
    try {
      const url = `${API_URL}/Attachment/${id}/download`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Image fetch failed");
      const blob = await res.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
    } catch (error) {
      console.error(error);
    }
  }

  const goToDetails = () => {
    navigate(`/details/${product.id}`);
  };


 const addToBasket = async (e) => {
  e.stopPropagation();

  if (!accessToken) {
    alert("You must be logged in to add items to basket");
    return;
  }

  try {
    const res = await api.post(
      "/BasketItem",
      { productId: product.id, quantity: 1 },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(res.data);
    alert("Product added to basket 🛒");
  } catch (error) {
    console.error(error);
    alert("Failed to add product to basket");
  }
};


  useEffect(() => {
    if (product?.attachments?.length > 0) {
      imageGet(product.attachments[0].id);
    }
  }, [product]);

  return (
    <div
      onClick={goToDetails}
      className={`relative w-[300px] p-3 border rounded-2xl space-y-2 shadow-sm flex flex-col
      ${isDarkmodeEnabled ? "border-pink-500" : "border-pink-300"}
      overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg`}
    >

      <img
        className="w-full h-[200px] object-cover rounded-xl"
        src={image}
        alt={product?.originalFileName}
      />

      <h1
        className={`text-xl font-medium line-clamp-2 ${isDarkmodeEnabled ? "text-white" : "text-black"
          }`}
      >
        {product?.name}
      </h1>

      <p
        className={`text-sm ${isDarkmodeEnabled ? "text-zinc-300" : "text-zinc-700"
          }`}
      >
        {product?.description}
      </p>

      <div className="flex justify-between items-center mt-2">
        <p
          className={`text-lg font-semibold ${isDarkmodeEnabled ? "text-white" : "text-black"
            }`}
        >
          {product?.price?.toFixed(2)} azn
        </p>
        <button
          onClick={addToBasket}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-sm
           ${isDarkmodeEnabled
              ? "bg-gray-800 text-white hover:bg-pink-700 hover:shadow-md"
              : "bg-white text-gray-900 hover:bg-pink-700 hover:text-white hover:shadow-md"}`
          }
        >
          Add to Basket
        </button>

      </div>
    </div>
  );
};

export default CartCard;