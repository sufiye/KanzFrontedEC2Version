import { useEffect, useState } from 'react'
import api from "../utils/axios"

const Profile = () => {
    const [user, setUser] = useState({})

    const getUserInfo = async () => {
        const { data, statusText } = await api.get("/auth/me")
        if (statusText === "OK") {
            setUser(data)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div className='w-full h-screen flex justify-center items-center'>{user.email}</div>
    )
}

export default Profile