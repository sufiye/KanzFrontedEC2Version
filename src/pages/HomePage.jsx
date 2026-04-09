import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDarkmode } from "../stores/store";

const API_URL = "http://localhost:5064/api";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkmodeEnabled } = useDarkmode();
  const { category } = useParams();

  async function getProducts() {
    try {
      let url = `${API_URL}/Product/pagedResult?page=1&pageSize=10`;
      if (searchTerm.length >= 1) url += `&search=${searchTerm}`;

      const res = await fetch(url);
      const data = await res.json();

      setProducts(data.items);
      setPage(1);
      setAllLoaded((data.items || []).length < 10);
    } catch (error) {
      console.error(error);
    }
  }

  const loadMore = async () => {
    try {
      const nextPage = page + 1;

      let url = `${API_URL}/Product/pagedResult?page=${nextPage}&pageSize=10`;
      if (searchTerm.length >= 1) url += `&search=${searchTerm}`;

      const res = await fetch(url);
      const data = await res.json();

      setProducts(prev => [...prev, ...(data.items || [])]);
      setPage(nextPage);

      if (!data.items || data.items.length < 10) {
        setAllLoaded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showLess = () => {
    setProducts(products.slice(0, 10));
    setPage(1);
    setAllLoaded(false);
  };

  useEffect(() => {
    getProducts();
  }, [searchTerm, category]);

  return (
    <div
      className={`min-h-screen
      ${
        isDarkmodeEnabled
          ? "bg-[#1c1814] text-[#e6dccf]"
          : "bg-[#f4efe7] text-[#3a3835]"
      }`}
    >
      <Navbar searchterm={searchTerm} setSearchterm={setSearchTerm} />

      <h2 className="text-center mt-20 mb-10 tracking-[3px] text-sm">
        BACK IN STOCK
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 px-12 max-w-7xl mx-auto">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      <div className="flex flex-col items-center mt-12 gap-4">
        {!allLoaded && !searchTerm && (
          <button
            onClick={loadMore}
            className="border px-8 py-3 text-xs tracking-wide hover:bg-black hover:text-white transition"
          >
            LOAD MORE
          </button>
        )}

        {products.length > 10 && (
          <button
            onClick={showLess}
            className="border px-8 py-3 text-xs tracking-wide hover:bg-black hover:text-white transition"
          >
            SHOW LESS
          </button>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;