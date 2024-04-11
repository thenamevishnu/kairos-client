import { Fragment, useState } from "react"
import Header from "../Header/Header"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()

    }

    return (
        <Fragment>
            <Header />
            <div className="w-screen flex justify-center mt-24 px-2 md:px-0">
                <form className="w-full md:w-[500px] shadow shadow-black rounded-xl p-4" onSubmit={handleLogin}>
                    <h1 className="text-center">Login to account</h1>
                    <div className="mt-3 w-full flex items-center border-2 rounded-xl p-3">
                        <label><i className="fa fa-envelope px-2" /></label>
                        <input type="text" name="email" placeholder="Email" className="w-full px-2 outline-none" value={formData.email} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                    </div>
                    <div className="mt-3 w-full flex items-center border-2 rounded-xl p-3">
                        <label><i className="fa fa-key px-2" /></label>
                        <input type="password" name="password" placeholder="Password" className="w-full px-2 outline-none" value={formData.password} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                    </div>
                    <div className="mt-3 text-center">
                        <button className="p-2 bg-purple-700 mb-3 w-full rounded-xl text-white shadow-sm shadow-black active:shadow-none">Login</button>
                        <span className="text-sm text-gray-600">Don't have an account? <span className="text-blue-700 cursor-pointer" onClick={() => navigate("/signup")}>Signup</span></span>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Login
