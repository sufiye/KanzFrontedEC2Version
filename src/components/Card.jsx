import { useState, useEffect } from "react";
import { useDarkmode } from "../stores/store";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useTokens } from "../stores/tokenStore";

const API_URL = "http://localhost:5064/api";

const CartCard = ({ product }) => {
  const [image, setImage] = useState("/no-image.png");
  const [added, setAdded] = useState(false); // ✨ animation state
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
      navigate("/login");
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

      setAdded(true);
      setTimeout(() => setAdded(false), 1500);

    } catch (error) {
      console.error(error);
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
      className={`relative p-3 rounded-xl flex flex-col gap-2 cursor-pointer border 
      transition-all duration-300 hover:scale-[1.03]
      ${
        isDarkmodeEnabled
          ? "bg-[#1f1b16]"
          : "bg-[#f4efe7]"
      }`}
    >

      <img
        className="w-full h-[200px] object-cover rounded-lg"
        src={image}
        alt={product?.originalFileName}
      />

      <h1 className="text-sm tracking-wide line-clamp-2">
        {product?.name}
      </h1>

      <p className="text-sm opacity-70">
        {product?.price?.toFixed(2)} azn
      </p>

      <button
        onClick={addToBasket}
        className={`relative overflow-hidden border text-xs tracking-wide py-2 mt-2 transition-all duration-300
        ${
          isDarkmodeEnabled
            ? "border-[#c2b6a3] text-[#e7dccf]"
            : "border-[#3a3835] text-[#3a3835]"
        }
        ${!added && "hover:bg-black hover:text-white"}
        `}
      >
        <span className={`transition ${added ? "opacity-0" : "opacity-100"}`}>
          ADD TO CART
        </span>

        <span
          className={`absolute inset-0 flex items-center justify-center transition
          ${added ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
        >
          ✓ ADDED
        </span>
      </button>
    </div>
  );
};

export default CartCard;