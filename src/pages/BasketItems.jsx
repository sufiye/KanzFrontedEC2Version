import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useState, useEffect } from "react"
import api from "../utils/axios"
import toast from "react-hot-toast"
import { useDarkmode } from "../stores/store"
import { useNavigate } from "react-router-dom"
const BasketItems = () => {
    const { isDarkmodeEnabled } = useDarkmode()
    const navigate = useNavigate()
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
                setFormData({ title: "", description: "", category: "", image: "" })
            }

        } catch (error) {
            console.error(error)
            toast.error("Error")
        }
    }


    useEffect(() => {
        const token = localStorage.getItem("tokens")
        if (!token) {
            navigate("/login")
            return
        }
        getCategory()
    }, [])


    return (
        <div className={`w-full h-fit ${isDarkmodeEnabled ? "bg-[#181A2A]":"bg-white"}`}>
            <Navbar />
    
            <Footer />
        </div>
    )
}

export default BasketItems
