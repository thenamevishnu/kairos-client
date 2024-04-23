import { Fragment, useRef, useState } from "react"
import Header from "../Header/Header"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { createUser } from "../../Services/user"
import { setToken } from "../../Utils/Helper"
import { jwtDecode } from "jwt-decode"
import { updateUser } from "../../Redux/UserSlice/User"

const Signup = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        type: "",
        username: "",
        password: "",
        confirm_password: ""
    })
    const [PasswordVisibility, setPasswordVisibility] = useState({
        password: false,
        confirm: false
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const search = new URLSearchParams(location.search)
    const nextRoute = search.get("next")

    const handleCreateAccount = async (event) => {
        event.preventDefault()
        for (let key in formData) {
            if (!formData[key]) {
                return toast.error(`${key.replace(key.charAt(0), key[0].toUpperCase())} is empty!`)
            }
        }
        if (formData.password != formData.confirm_password) {
            return toast.error("Password does not match!")
        }
        const response = await createUser(formData)
        if (response?.result) {
            setToken(response.result)
            const { sub } = jwtDecode(response.result)
            dispatch(updateUser({
                id: sub._id,
                name: sub.name,
                picture: sub.dp,
                email: sub.email,
                username: sub.username,
                type: sub.type
            }))
            navigate(nextRoute ? nextRoute : "/", {
                replace: true
            })
        } else {
            return toast.error(response.message)
        }
    }

    return (
        <Fragment>
            <Header search={ false } />
            <div className="w-screen flex justify-center mt-20 px-2 md:px-0">
                <form className="w-full bg-primaryGreen sm:w-[500px] rounded-xl p-4" autoComplete="off" onSubmit={handleCreateAccount}>
                    <h1 className="text-center text-2xl">Create Account</h1>
                    <div className="mt-6 w-full bg-white flex items-center border-2 rounded-xl">
                        <label><i className="fa fa-user p-3" /></label>
                        <input type="text" name="name" placeholder="Full Name" className="w-full p-3 outline-none rounded-e-xl" value={formData.name} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                    </div>
                    <div className="mt-3 w-full bg-white flex items-center border-2 rounded-xl">
                        <label><i className="fa fa-envelope p-3" /></label>
                        <input type="text" name="email" placeholder="Email"  className="w-full p-3 outline-none rounded-e-xl" value={formData.email} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})} autoComplete="off"/>
                    </div>
                    <div className="mt-3 w-full justify-center gap-5 flex items-center rounded-xl">
                        <div onClick={() => setFormData({...formData, type: "student"})} className="w-full p-3 cursor-pointer relative outline-none bg-white border-2 text-center rounded-xl">
                            Student
                            { formData?.type == "student" && <i className="absolute right-2 top-2 text-green-700 fa fa-circle-check"/>}
                        </div>
                        <div onClick={() => setFormData({...formData, type: "mentor"})} className="w-full p-3 cursor-pointer relative outline-none bg-white border-2 text-center rounded-xl">
                            Mentor
                            { formData?.type == "mentor" && <i className="absolute right-2 top-2 text-green-700 fa fa-circle-check"/>}
                        </div>
                    </div>
                    <div className="mt-3 w-full bg-white flex items-center border-2 rounded-xl">
                        <label><i className="fa fa-at p-3" /></label>
                        <input type="text" name="username" placeholder="Username" className="w-full p-3 outline-none rounded-e-xl" value={formData.username} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                    </div>
                    <div className="mt-3 w-full bg-white flex items-center border-2 rounded-xl">
                        <label><i className="fa fa-key p-3" /></label>
                        <input type={ PasswordVisibility?.password ? "text" : "password" } name="password" placeholder="Password" className="w-full p-3 outline-none" value={formData.password} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                        <label><i className="fa fa-eye cursor-pointer p-3" onClick={() => setPasswordVisibility(prev => ({...prev, password: !prev.password}))}/></label>
                    </div>
                    <div className="mt-3 w-full bg-white flex items-center border-2 rounded-xl">
                        <label><i className="fa fa-lock p-3" /></label>
                        <input type={ PasswordVisibility?.confirm ? "text" : "password" } name="confirm_password" placeholder="Confirm Password" className="w-full p-3 outline-none" value={formData.confirm_password} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                        <label><i className="fa fa-eye cursor-pointer p-3" onClick={() => setPasswordVisibility(prev => ({...prev, confirm: !prev.confirm}))}/></label>
                    </div>
                    <div className="mt-3 text-center">
                        <button className="p-2 bg-lightGreen mb-3 w-full rounded-xl text-white shadow-sm shadow-black active:shadow-none">Create Account</button>
                        <span className="text-sm text-lightGreen    ">Already have an account? <span className="text-blue-700 cursor-pointer" onClick={() => navigate("/login")}>Login</span></span>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Signup
