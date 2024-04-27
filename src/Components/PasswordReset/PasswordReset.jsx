import { Fragment, useState } from "react"
import Header from "../Header/Header"
import { resetPassword } from "../../Services/user"
import toast from "react-hot-toast"

const PasswordReset = () => {

    const [formData, setFormData] = useState({
        email: ""
    })

    const handleReset = async (e) => {
        e.preventDefault()
        const response = await resetPassword(formData)
        if (response?.status == "OK") {
            return toast.success(response.message)
        }
        return toast.error(response?.message)
    }

    return (
        <Fragment>
            <Header search={false} />
            <div className="w-screen flex justify-center mt-20 px-2 md:px-0">
                <form className="w-full bg-primaryGreen sm:w-[500px] rounded-xl p-4" onSubmit={handleReset}>
                    <h1 className="text-center text-2xl">Reset Password</h1>
                    <div className="mt-3 w-full bg-white flex items-center border-2 rounded-xl">
                        <label><i className="fa fa-envelope p-3 text-lightGreen" /></label>
                        <input type="text" name="email" placeholder="Registered Email" className="w-full bg-white p-3 rounded-xl outline-none" value={formData.email} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                    </div>
                    <div className="mt-3 text-center">
                        <button type="submit" className="p-2 bg-lightGreen mb-3 w-full rounded-xl text-white">Reset</button>
                    </div>
                    <div className="text-red-500 text-xs italic text-center">Note: We will send you a password. You can change the password from your profile.</div>
                </form>
            </div>
        </Fragment>
    )
}

export default PasswordReset
