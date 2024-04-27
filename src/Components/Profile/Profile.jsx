import { Fragment, useState } from "react"
import Header from "../Header/Header"
import { useDispatch, useSelector } from "react-redux"
import { profileUpdate } from "../../Services/user"
import toast from "react-hot-toast"
import { updateUser } from "../../Redux/UserSlice/User"
import ProfileInfo from "./ProfileInfo"
import ChangePassword from "./ChangePassword"
import DeleteAccount from "./DeleteAccount"
import DeleteAlert from "../Modal/DeleteAlert"

const Profile = () => {

    const reduxData = useSelector(state => state.user)
    const { picture, name, email, username, id: user_id } = reduxData
    const [isDeleteOpen, setDeleteOpen] = useState(false)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: name, username: username, email: email
    })
    const [isEditable, setEditable] = useState(false)
    const [clickedSection, setClickedSection] = useState("profileInfo")

    const handleEdit = async () => {
        setEditable(false)
        for (let key in formData) {
            if (formData[key] == "") {
                return toast.error(key.replace(key.charAt(0), key[0].toUpperCase()) + " is required")
            }
        }
        const obj = {}
        if (formData.name != name) obj.name = formData.name
        if (formData.username != username) obj.username = formData.username
        if (Object.keys(obj).length > 0) {
            obj.user_id = user_id
            const response = await profileUpdate(obj)
            if (response?.status == "OK") {
                dispatch(updateUser({...reduxData, ...obj}))
                return toast.success("Profile Updated")
            }
            return toast.error(response?.message)
        }
        return toast.error("No changes")
    }

    return (
        <Fragment>
            {isDeleteOpen && <DeleteAlert isDeleteOpen={isDeleteOpen} user_id={ user_id } setDeleteOpen={ setDeleteOpen } />}
            <Header search={false} />
            <div className="flex justify-center w-screen">
                <div className="mt-20 flex flex-col md:flex-row w-full md:w-[800px] lg:w-[1000px] xl:w-[1200px] text-center gap-2 px-2 md:px-10">
                    <div className="p-3 rounded-xl shadow shadow-gray-400 md:w-[400px] w-full">
                        <div className="flex flex-col items-center">
                            <img src={ picture } alt="user profile" className="w-32"/>
                            <p>{ name }</p>
                        </div>
                        <div className="mt-10">
                            <ul className="flex flex-col gap-2">
                            <li onClick={() => setClickedSection("profileInfo")} className={`transition-all duration-150 ease-linear p-1 bg-gray-100 rounded-xl ${clickedSection == "profileInfo" ? "bg-purple-700 text-white" : "hover:bg-gray-300"} cursor-pointer`}>Profile Information</li>
                                <li onClick={() => setClickedSection("changePassword")} className={`transition-all duration-150 ease-linear p-1 bg-gray-100 rounded-xl ${clickedSection == "changePassword" ? "bg-purple-700 text-white" : "hover:bg-gray-300"} cursor-pointer`}>Change Password</li>
                                <li onClick={() => setClickedSection("deleteAccount")} className={`transition-all duration-150 ease-linear p-1 bg-gray-100 rounded-xl ${clickedSection == "deleteAccount" ? "bg-purple-700 text-white" : "hover:bg-gray-300"} cursor-pointer`}>Delete Account</li>
                            </ul>
                        </div>
                    </div>
                    {clickedSection == "profileInfo" && <ProfileInfo reduxData={reduxData} formData={formData} isEditable={isEditable} handleEdit={handleEdit} setEditable={setEditable} setFormData={setFormData} />}
                    {clickedSection == "changePassword" && <ChangePassword />}
                    {clickedSection == "deleteAccount" && <DeleteAccount setDeleteOpen={ setDeleteOpen } />}
                </div>
            </div>
        </Fragment>
    )
}

export default Profile
