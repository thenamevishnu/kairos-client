import { useState } from "react"
import toast from "react-hot-toast"
import { passwordUpdate } from "../../Services/user"
import { useNavigate } from "react-router-dom"
import { initialRedux, removeToken } from "../../Utils/Helper"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../Redux/UserSlice/User"

const ChangePassword = () => {

    const [password, setPassword] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
    const { id: user_id } = useSelector(state => state.user)
    const [passwordVisibility, setPasswordVisibility] = useState({current: false, newPass: false, confirmPass: false})
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handlePasswordChange = async () => {
        for (let key in password) {
            if (password[key] == "") {
                return toast.error(key.replace(key.charAt(0), key[0].toUpperCase()) +" is required")
            }
        }
        if (password.newPassword != password.confirmPassword) {
            return toast.error("Password does not match")
        }
        if (password.currentPassword == password.newPassword) {
            return toast.error("New password is same as current password")
        }
        const response = await passwordUpdate({
            user_id: user_id,
            currentPassword: password.currentPassword,
            newPassword: password.newPassword
        })
        if (response?.status == "OK") {
            removeToken()
            dispatch(updateUser(initialRedux))
            return navigate("/login")
        }
        return toast.error(response?.message)
    }

    return (
        <div className="border-2 rounded-xl md:w-[800px] w-full">
            <form className="p-4" onSubmit={(e) => e.preventDefault()}>
                <h1 className="text-start mb-5">Change Password</h1>
                <div className="bg-gray-100 flex items-center w-full rounded-xl">
                    <i className="fa fa-lock p-2" />
                    <input autoComplete="off" type={`${passwordVisibility.current ? "text" : "password"}`} placeholder="Current Password" className="p-2 rounded-xl outline-none bg-transparent w-full" value={password.currentPassword} name="currentPassword"  onChange={(e) => setPassword({...password, [e.target.name]: e.target.value})}/>
                    <i className="fa fa-eye p-2 cursor-pointer" onClick={() => setPasswordVisibility(prev => ({...prev, current: !prev.current}))}/>
                </div>
                <div className="bg-gray-100 mt-3 flex items-center w-full rounded-xl">
                    <i className="fa fa-key p-2" />
                    <input autoComplete="off" type={`${passwordVisibility.newPass ? "text" : "password"}`} placeholder="New Password" className="p-2 rounded-xl outline-none bg-transparent w-full" value={password.newPassword} name="newPassword"  onChange={(e) => setPassword({...password, [e.target.name]: e.target.value})}/>
                    <i className="fa fa-eye p-2 cursor-pointer" onClick={() => setPasswordVisibility(prev => ({...prev, newPass: !prev.newPass}))}/>
                </div>
                <div className="bg-gray-100 mt-3 flex items-center w-full rounded-xl">
                    <i className="fa fa-key p-2" />
                    <input autoComplete="off" type={`${passwordVisibility.confirmPass ? "text" : "password"}`} placeholder="Confirm Password" className="p-2 rounded-xl outline-none bg-transparent w-full" value={password.confirmPassword} name="confirmPassword"  onChange={(e) => setPassword({...password, [e.target.name]: e.target.value})}/>
                    <i className="fa fa-eye p-2 cursor-pointer" onClick={() => setPasswordVisibility(prev => ({...prev, confirmPass: !prev.confirmPass}))}/>
                </div>
                <div className="flex justify-start mt-5">
                    <button onClick={() => handlePasswordChange() } className="bg-purple-700 text-white p-1 px-2 rounded-lg"><i className="fa fa-refresh"/> Update</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword
