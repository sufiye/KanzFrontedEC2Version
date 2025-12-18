import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import NotFound from "../pages/NotFound"
import Login from "../pages/Login"
import Register from "../pages/Register"
import AddNewBlog from "../pages/AddNewBlog"
import Details from "../pages/Details"


const Navigator = () => {
  return (
   <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/newBlog" element={<AddNewBlog/>} />
    <Route path="/details/:id" element={<Details/>} />
    <Route path="*" element={<NotFound/>} />

   </Routes>
  )
}

export default Navigator