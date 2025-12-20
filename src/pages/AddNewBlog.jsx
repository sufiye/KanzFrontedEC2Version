import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useState, useEffect } from "react"
import api from "../utils/axios"
import toast from "react-hot-toast"

const AddNewBlog = () => {

    const [category, setCategory] = useState([])
    const [formData, setFormData] = useState({ title: "", description: "", category: "", image: "" })

    const getCategory = async () => {
        try {
            const { data, statusText } = await api.get("/categories")
            console.log(data)
            if (statusText === "OK") {
                setCategory(data)
            }
        } catch (error) {
            console.error(error)
        }
    }
    const handleInputChange = (title, value) => {
        setFormData(prevState => ({
            ...prevState,
            [title]: value
        }))
    }

    const addNewBlog = async () => {
        try {
            const { data, statusText } = await api.post("", formData)

            if (statusText === "OK") {
                console.log(data);
                toast.success("Blog added successfully : )")
            }

        } catch (error) {
            console.error(error)
            toast.error("Error")
        }
    }


    useEffect(() => {
        getCategory()
    }, [])


    return (
        <div className="h-screen w-full">
            <Navbar />
            <div className="h-fit my-20 flex justify-center items-center flex-col space-y-5">
                <h1 className="text-4xl font-bold mb-13 text-[#232536]">Write a new blog</h1>
                <input value={formData?.title} onChange={(e) => {
                    handleInputChange("title", e.target.value)
                }} className=" border w-140 h-13 p-4  border-zinc-300 text-sm placeholder:text-[#232536]" placeholder="Add title for blog" type="text"></input>
                <select value={formData?.category} onChange={(e) => {
                    handleInputChange("category", e.target.value)
                }} className=" border w-140 h-13 p-4  border-zinc-300 text-sm text-[#232536]" name="" id="">
                    <option value="" disabled>Select category</option>
                    {category.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                <input value={formData?.image} onChange={(e) => {
                    handleInputChange("image", e.target.value)
                }} className=" border w-140 h-13 p-4  border-zinc-300 text-sm placeholder:text-[#232536]" placeholder="Add thumbnail image" type="text" />
                <textarea value={formData?.description} onChange={(e) => {
                    handleInputChange("description", e.target.value)
                }} className="h-50 w-140 border p-4  border-zinc-300 text-sm placeholder:text-[#232536]" placeholder="Add blog body" name="" id=""></textarea>
                <button onClick={addNewBlog} className="bg-[#FFD050] w-140 h-15 "><h1 className="text-xl font-bold text-[#232536] cursor-pointer" >Submit</h1></button>
            </div>
            <Footer />
        </div>
    )
}

export default AddNewBlog