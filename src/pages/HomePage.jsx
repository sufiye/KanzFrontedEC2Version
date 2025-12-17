import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Card from "../components/Card"

const HomePage = () => {
  return (
    <div className="w-full h-screen">
        <Navbar/>
        <div className="flex justify-center items-center gap-10 my-10">
            <Card/>
        </div>
      
        <Footer/>
    </div>
  )
}

export default HomePage