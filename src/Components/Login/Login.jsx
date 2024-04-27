import { Fragment, useState } from "react"
import Header from "../Header/Header"
import { useLocation, useNavigate } from "react-router-dom"
import { loginUser } from "../../Services/user"
import { jwtDecode } from "jwt-decode"
import { useDispatch } from "react-redux"
import { updateUser } from "../../Redux/UserSlice/User"
import toast from "react-hot-toast"
import { setToken } from "../../Utils/Helper"

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const search = new URLSearchParams(location.search)
    const nextRoute = search.get("next")

    const handleLogin = async (event) => {
        event.preventDefault()
        for (let key in formData) {
            if (!formData[key]) {
                return toast.error(`${key.replace(key.charAt(0), key[0].toUpperCase())} is empty!`)
            }
        }
        const response = await loginUser(formData)
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
                <form className="w-full bg-primaryGreen sm:w-[500px] rounded-xl p-4" onSubmit={handleLogin}>
                    <h1 className="text-center text-2xl">Login to account</h1>
                    <div className="mt-3 w-full bg-white flex items-center border-2 rounded-xl">
                        <label><i className="fa fa-envelope p-3 text-lightGreen" /></label>
                        <input type="text" name="email" placeholder="Email" className="w-full bg-white p-3 rounded-xl outline-none" value={formData.email} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                    </div>
                    <div className="mt-3 w-full flex bg-white items-center border-2 rounded-xl">
                        <label><i className="fa fa-key p-3 text-lightGreen" /></label>
                        <input type={ passwordVisibility ? "text" : "password" } name="password" placeholder="Password" className="w-full bg-white p-3 rounded-xl outline-none" value={formData.password} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                        <i className="fa fa-eye p-3 text-lightGreen cursor-pointer" onClick={()=>setPasswordVisibility(prev => !prev)}/>
                    </div>
                    <div className="mt-3 text-center">
                        <button className="p-2 bg-lightGreen mb-3 w-full rounded-xl text-white">Login</button>
                        <div className="text-sm text-lightGreen">Don't have an account? <span className="text-blue-700 cursor-pointer" onClick={() => navigate("/signup")}>Signup</span></div>
                        <div className="text-sm text-lightGreen mt-2 cursor-pointer" onClick={() => navigate("/password/reset")}>Forgot Password</div>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Login
