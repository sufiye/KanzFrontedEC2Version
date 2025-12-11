import { Route,Routes } from "react-router-dom"
import Products from "../pages/Products"
import Details from "../pages/Details"
import NotFound from "../pages/NotFound"
import { UserDetails } from "../pages/UserDetails"
import UserAccount from "../pages/UserAccount"
import UserLayout from "./UserLayout"
import Login from "../pages/Login"
import Profile from "../pages/Profile"
import { useTokens } from "../stores/tokenStore"

import New from "../pages/New"

const Navigator = () => {
    const{accessToken} = useTokens()

  return (
   <Routes>
       <Route path="/" element={<Products />} />
       <Route path="/new" element={<New />} />
       {/* dinamic rout */}
       <Route path="/details/:id" element={<Details />} />
       {/* nested rout */}
       <Route path="user" element={<UserLayout/>} > 
          <Route path="details" element={<UserDetails />} />
          <Route path="account" element={<UserAccount />} />
       </Route>
        <Route path="/login" element={<Login />} />
        {accessToken && <Route path="/profile" element={<Profile />} />}
       <Route path="*" element={<NotFound />} />
       
</Routes>
  )
}

export default Navigator