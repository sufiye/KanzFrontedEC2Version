

const Footer = () => {
  return (
    <div className="bg-zinc-100 w-full ">

      <div className=" flex justify-between px-42 py-10 " id="contact">

        <div >
          <h1 className="font-medium text-base text-black mb-3">About</h1>
          <div className=" w-60">
            <p className="text-sm text-zinc-500 mb-3"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
          </div>
          <h1 className="font-medium text-base text-black">Email : <a href="mailto:" className="font-normal text-sm text-zinc-500">info@jstemplate.net</a></h1>
          <h1 className="font-medium text-base text-black">Phone : <a href="tel:+" className="font-normal text-sm text-zinc-500">880 123 456 789</a></h1>

        </div>

        <div className="grid grid-cols-2 gap-15 ">
          <div className="text-sm text-zinc-500 space-y-1">
            <h1 className="font-medium text-base text-black mb-3">Quick Link</h1>
            <p>Home</p>
            <p>Write a Blog</p>
            <p>My Blogs</p>
            <p>Contact</p>
          </div>
          <div className="text-sm text-zinc-500 space-y-1">
            <h1 className="font-medium text-base text-black mb-3">Category</h1>
            <p>Lifestyle</p>
            <p>Technology</p>
            <p>Travel</p>
            <p>Business</p>
            <p>Economy</p>
            <p>Sports</p>
          </div>

        </div>

      </div>

      <div className="bg-zinc-100 w-full  items-center justify-center">

        <div className="border-t border-zinc-300 mx-40"></div>

        <div className=" flex justify-between items-center px-42 py-5" >

          <div className="flex justify-center items-center gap-2">
            <div><img src="..\src\assets\Logo.png" alt="" /></div>
            <div>
              <div className="flex">
                <h1>Meta</h1>
                <h1 className="text-base font-bold">Blog</h1>
              </div>

              <p className="text-sm text-zinc-500">© JS Template 2023. All Rights Reserved.</p>
            </div>
          </div>

          <div className="flex gap-5 text-sm text-zinc-500">
            <p>Terms of Use</p>
            <p>Privacy Policy</p>
            <p>Cookie Policy</p>
          </div>


        </div>

      </div>

    </div>
  )
}

export default Footer