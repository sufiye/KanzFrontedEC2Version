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
      let url = `${API_URL}/Product?page=1&limit=10`;

      const res = await fetch(url);
      const data = await res.json();

      console.log(data);
      
      setProducts(data);
      setPage(1);
      setAllLoaded(false);

    } catch (error) {
      console.error(error);
    }
  }

  const loadMore = async () => {
    try {
      const nextPage = page + 1;

      let url = `${API_URL}/Product`;

      if (category) url += `&category=${category}`;
      if (searchTerm.length >= 3) url += `&search=${searchTerm}`;

      const res = await fetch(url);
      const data = await res.json();

      console.log(data.data)
      setProducts(prev => [...prev, ...(data.products || data)]);
      setPage(nextPage);

      if (data.totalPages && data.totalPages <= nextPage) {
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

        {!searchTerm && (
          <button
            onClick={allLoaded ? showLess : loadMore}
            className={`border-2 rounded-lg h-13 w-33 text-sm mt-10 cursor-pointer ${
              isDarkmodeEnabled
                ? "text-zinc-300 border-zinc-400"
                : "text-[#696A75] border-[#696A754D]/40"
            }`}
          >
            {allLoaded ? "Show Less" : "Load More"}
          </button>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;