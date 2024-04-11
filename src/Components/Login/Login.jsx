import { Fragment, useState } from "react"
import Header from "../Header/Header"
import { useNavigate } from "react-router-dom"
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
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        const response = await loginUser(formData)
        if (response?.result) {
            setToken(response.result)
            const { sub } = jwtDecode(response.result)
            toast.success("Redirecting...")
            setTimeout(() => {
                dispatch(updateUser({
                    id: sub._id,
                    name: sub.name,
                    picture: sub.dp,
                    gmail: sub.gmail,
                    username: sub.username
                }))
                navigate("/", {
                    replace: true
                })
            }, 1500);
        } else {
            return toast.error(response.message)
        }
    }

    return (
        <Fragment>
            <Header search={ false } />
            <div className="w-screen flex justify-center mt-10 px-2 md:px-0">
                <form className="w-full bg-primaryGreen sm:w-[500px] rounded-xl p-4" onSubmit={handleLogin}>
                    <h1 className="text-center">Login to account</h1>
                    <div className="mt-3 w-full bg-white flex items-center border-2 rounded-xl">
                        <label><i className="fa fa-envelope p-3 text-lightGreen" /></label>
                        <input type="text" name="email" placeholder="Email" className="w-full bg-white p-3 outline-none" value={formData.email} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                    </div>
                    <div className="mt-3 w-full flex bg-white items-center border-2 rounded-xl">
                        <label><i className="fa fa-key p-3 text-lightGreen" /></label>
                        <input type="password" name="password" placeholder="Password" className="w-full bg-white p-3 outline-none" value={formData.password} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                    </div>
                    <div className="mt-3 text-center">
                        <button className="p-2 bg-lightGreen mb-3 w-full rounded-xl text-white">Login</button>
                        <span className="text-sm text-lightGreen">Don't have an account? <span className="text-blue-700 cursor-pointer" onClick={() => navigate("/signup")}>Signup</span></span>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Login
