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

      if (searchTerm.length >= 1) {
        url += `&search=${searchTerm}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

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

      if (!data.items || data.items.length < 10 || nextPage >= (data.totalPages || 0)) {
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
    <div className={`w-full h-fit ${isDarkmodeEnabled ? "bg-[#181A2A]" : "bg-white"}`}>
      <Navbar searchterm={searchTerm} setSearchterm={setSearchTerm} />

      <div className="flex justify-center items-center flex-col my-20">
        <div className="grid grid-cols-3 gap-5">
          {products.map((product) =>
            <Card key={product.id} product={product} />
          )}
        </div>

        {!allLoaded && !searchTerm && (
          <button
            onClick={loadMore}
            className={`border-2 rounded-lg h-13 w-33 text-sm mt-10 cursor-pointer ${isDarkmodeEnabled
                ? "text-zinc-300 border-zinc-400"
                : "text-[#696A75] border-[#696A754D]/40"
              }`}
          >
            Load More
          </button>
        )}
          {products.length > 10 && (
    <button
      onClick={showLess}
      className={`border-2 rounded-lg h-13 w-33 text-sm mt-4 cursor-pointer ${
        isDarkmodeEnabled
          ? "text-zinc-300 border-zinc-400"
          : "text-[#696A75] border-[#696A754D]/40"
      }`}
    >
      Show Less
    </button>
  )}
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;