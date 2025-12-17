import NavbarLr from "../components/NavbarLR"
import Footer from "../components/Footer"

const Register = () => {
    return (
        <div className="w-full h-screen">
            <NavbarLr />
            <div className="h-fit my-20 flex justify-center items-center flex-col space-y-5">

                <h1 className="text-4xl font-bold mb-16 text-[#232536]">Register</h1>
                <input  className=" border w-140 h-13 p-4 border-zinc-300  text-sm placeholder:text-[#232536]" placeholder="Enter your firstname" type="text" />
                <input  className=" border w-140 h-13 p-4 border-zinc-300  text-sm placeholder:text-[#232536]" placeholder="Enter tour lastname" type="text" />
                <input className=" border w-140 h-13 p-4 border-zinc-300  text-sm placeholder:text-[#232536]" placeholder="Enter your email" type="email" name="" id="" />
                <input className=" border w-140 h-13 p-4  border-zinc-300 text-sm placeholder:text-[#232536]" placeholder="Enter your password" type="password" name="" id="" />
                <button className="bg-[#FFD050] w-140 h-15 "><h1 className="text-xl font-bold text-[#232536] cursor-pointer">Register</h1></button>
            </div>

            <Footer />
        </div>
    )
}

export default Register