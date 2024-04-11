import { Fragment, useState } from "react"
import Header from "../Header/Header"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { createUser } from "../../Services/user"

const Signup = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirm_password: ""
    })
    const navigate = useNavigate()

    const handleCreateAccount = async (event) => {
        event.preventDefault()
        const response = await createUser(formData)
        if (response?.result) {
            
        }
    }

    return (
        <Fragment>
            <Header />
            <div className="w-screen flex justify-center mt-24 px-2 md:px-0">
                <form className="w-full md:w-[500px] shadow shadow-black rounded-xl p-4" onSubmit={handleCreateAccount}>
                    <h1 className="text-center">Create Account</h1>
                    <div className="mt-6 w-full flex items-center border-2 rounded-xl p-3">
                        <label><i className="fa fa-user px-2" /></label>
                        <input type="text" name="name" placeholder="Full Name" className="w-full px-2 outline-none" value={formData.name} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                    </div>
                    <div className="mt-3 w-full flex items-center border-2 rounded-xl p-3">
                        <label><i className="fa fa-envelope px-2" /></label>
                        <input type="text" name="email" placeholder="Email" className="w-full px-2 outline-none" value={formData.email} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                    </div>
                    <div className="mt-3 w-full flex items-center border-2 rounded-xl p-3">
                        <label><i className="fa fa-at px-2" /></label>
                        <input type="text" name="username" placeholder="Username" className="w-full px-2 outline-none" value={formData.username} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                    </div>
                    <div className="mt-3 w-full flex items-center border-2 rounded-xl p-3">
                        <label><i className="fa fa-key px-2" /></label>
                        <input type="password" name="password" placeholder="Password" className="w-full px-2 outline-none" value={formData.password} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                    </div>
                    <div className="mt-3 w-full flex items-center border-2 rounded-xl p-3">
                        <label><i className="fa fa-lock px-2" /></label>
                        <input type="password" name="confirm_password" placeholder="Confirm Password" className="w-full px-2 outline-none" value={formData.confirm_password} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                    </div>
                    <div className="mt-3 text-center">
                        <button className="p-2 bg-purple-700 mb-3 w-full rounded-xl text-white shadow-sm shadow-black active:shadow-none">Create Account</button>
                        <span className="text-sm text-gray-600">Already have an account? <span className="text-blue-700 cursor-pointer" onClick={() => navigate("/login")}>Login</span></span>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Signup
