import { FooterDemo } from "../components/Footer"
import { LoginDemo } from "../components/LoginCard"
import { NavbarDemo } from "../components/Navbar"

const New = () => {
  return (
    <div className='w-full h-screen'>
        <NavbarDemo/>
        <LoginDemo/>
        <FooterDemo/>
    </div>
  )
}

export default New