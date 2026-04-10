import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDarkmode } from "../stores/store";
import api from "../utils/axios";
import { useTokens } from "../stores/tokenStore";


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    categoryId: "",
    price: 0,
    stockCount: 0,
  });

  const roles = useTokens((state) => state.roles);
  const isAdmin = roles.includes("Admin");

  const { isDarkmodeEnabled } = useDarkmode();
  const { category } = useParams();

  async function getProducts() {
    try {
      let url = `/Product/pagedResult?page=1&pageSize=10`;
      if (searchTerm.length >= 1) url += `&search=${searchTerm}`;

      const res = await api.get(url);

      console.log(roles);
      
      setProducts(res.data.items);
      setPage(1);
      setAllLoaded((res.data.items || []).length < 10);
    } catch (error) {
      console.error(error);
    }
  }

  const loadMore = async () => {
    try {
      const nextPage = page + 1;

      let url = `/Product/pagedResult?page=${nextPage}&pageSize=10`;
      if (searchTerm.length >= 1) url += `&search=${searchTerm}`;

      const res = await api.get(url);

      setProducts(prev => [...prev, ...(res.data.items || [])]);
      setPage(nextPage);

      if (!res.data.items || res.data.items.length < 10) {
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


  async function getCategories() {
    try {
      const res = await api.get("/Category");
      
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addProduct() {
    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("categoryId", form.categoryId);
      formData.append("price", form.price);
      formData.append("stockCount", form.stockCount);


      await api.post("/Product", formData);

      setShowModal(false);
      setForm({
        name: "",
        title: "",
        description: "",
        categoryId: "",
        price: 0,
        stockCount: 0,
      });
      setImage(null);

      getProducts();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteProduct(id) {
    try {
      await api.delete(`/Product/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, [searchTerm, category]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isDarkmodeEnabled
          ? "bg-[#1c1814] text-[#e6dccf]"
          : "bg-[#f4efe7] text-[#3a3835]"
      }`}
    >
      <Navbar searchterm={searchTerm} setSearchterm={setSearchTerm} />

      <h2 className="text-center mt-20 mb-10 tracking-[3px] text-sm">
        BACK IN STOCK
      </h2>

      {isAdmin && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="border px-6 py-2 text-xs hover:bg-black hover:text-white"
          >
            ADD PRODUCT
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 px-12 max-w-7xl mx-auto">
        {products.map((product) => (
          <div key={product.id}>
            <Card product={product} />

            {isAdmin && (
              <button
                onClick={() => deleteProduct(product.id)}
                className="text-red-500 text-xs mt-2"
              >
                DELETE
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center mt-12 gap-4">
        {!allLoaded && !searchTerm && (
          <button
            onClick={loadMore}
            className="border px-8 py-3 text-xs hover:bg-black hover:text-white"
          >
            LOAD MORE
          </button>
        )}

        {products.length > 10 && (
          <button
            onClick={showLess}
            className="border px-8 py-3 text-xs hover:bg-black hover:text-white"
          >
            SHOW LESS
          </button>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 w-[400px] text-black">
            <h2 className="mb-4">Add Product</h2>

            <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})} className="border w-full mb-2 p-2"/>
            <input placeholder="Title" onChange={(e)=>setForm({...form,title:e.target.value})} className="border w-full mb-2 p-2"/>
            <input placeholder="Description" onChange={(e)=>setForm({...form,description:e.target.value})} className="border w-full mb-2 p-2"/>
            <input placeholder="Price" type="number" onChange={(e)=>setForm({...form,price:e.target.value})} className="border w-full mb-2 p-2"/>
            <input placeholder="Stock" type="number" onChange={(e)=>setForm({...form,stockCount:e.target.value})} className="border w-full mb-2 p-2"/>

            <select onChange={(e)=>setForm({...form,categoryId:e.target.value})} className="border w-full mb-2 p-2">
              <option>Select Category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <div className="flex justify-between mt-4">
              <button onClick={addProduct} className="bg-black text-white px-4 py-2">
                Save
              </button>
              <button onClick={()=>setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;