import { useDarkmode } from "../stores/store"



const Footer = () => {
  const { isDarkmodeEnabled } = useDarkmode()
  return (
    <div className={` w-full h-100 ${isDarkmodeEnabled ? "bg-[#141624]" : "bg-zinc-100"}`} >

    </div>
  )
}

export default Footer