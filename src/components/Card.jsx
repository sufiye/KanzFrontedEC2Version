import { useDarkmode } from "../stores/store";

const CartCard = ({ product }) => {
  const { isDarkmodeEnabled } = useDarkmode();

  const imageUrl =
    product?.attachments?.length > 0
      ? product.attachments[0].url
      : "/no-image.png";

  return (
    <div
      className={`relative w-[300px] p-3 border rounded-2xl space-y-2 shadow-sm flex flex-col
      ${isDarkmodeEnabled ? "border-zinc-800" : "border-zinc-200"}
      overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg`}
    >
      {/* Image */}
      <img
        className="w-full h-[200px] object-cover rounded-xl"
        src={imageUrl}
        alt={product?.orginalFileName}
      />

      {/* Product info */}
      <h1
        className={`text-xl font-medium line-clamp-2 ${
          isDarkmodeEnabled ? "text-white" : "text-black"
        }`}
      >
        {product?.name}
      </h1>

      <p
        className={`text-sm ${
          isDarkmodeEnabled ? "text-zinc-300" : "text-zinc-700"
        }`}
      >
        {product?.description}
      </p>

      <div className="flex justify-between items-center mt-2">
        <p
          className={`text-lg font-semibold ${
            isDarkmodeEnabled ? "text-white" : "text-black"
          }`}
        >
          {product?.price?.toFixed(2)} azn
        </p>

        <p
          className={`text-sm ${
            isDarkmodeEnabled ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          Stock: {product?.stockCount}
        </p>
      </div>
    </div>
  );
};

export default CartCard;