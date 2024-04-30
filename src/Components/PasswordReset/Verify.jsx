import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { resetPasswordVerify } from "../../Services/user"

const Verify = () => {

    const location = useLocation()
    const search = new URLSearchParams(location.search)
    const hash = search.get("hash")
    const [changeResponse, setChangeResponse] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await resetPasswordVerify(hash)
        }
        fetchData()
    }, [])

    return (
        <div className="flex justify-center items-center h-screen px-2 md:px-10">
            <div className="text-center w-full sm:w-[500px] p-3 rounded-xl shadow shadow-black">
                <i className="fa fa-circle-check text-6xl text-green-600 mb-3"/>
                <h2>Password Changed Successfully!</h2>
                <p className="italic text-sm mt-5">Your password has been successfully changed to a password. Remember to use your new password to access your account</p>
                <p className="italic mt-5 text-sm">Check your email for password</p>
            </div>
        </div>
    )
}

export default Verify
