import toast from "react-hot-toast"
import { deleteAccount } from "../../Services/user"
import { useNavigate } from "react-router-dom"
import { initialRedux, removeToken } from "../../Utils/Helper"
import { useDispatch } from "react-redux"
import { updateUser } from "../../Redux/UserSlice/User"

const DeleteAlert = ({ isDeleteOpen, user_id, setDeleteOpen }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleDeleteAccount = async () => {
        const response = await deleteAccount(user_id, isDeleteOpen)
        if (response?.status == "OK") {
            toast.success("Account successfully deleted")
            removeToken()
            dispatch(updateUser(initialRedux))
            return navigate("/login")
            
        }
        return toast.error(response?.message)
    }

    return (
        <div className="bg-black bg-opacity-50  flex justify-center pt-20 px-2 md:px-10 w-screen h-screen absolute z-50">
                <div className="bg-white rounded-xl p-5 h-44 sm:w-96 w-full">
                <h1 className="text-red-600"><i className="fa fa-trash" /> Delete Account</h1>
                <p className="ps-3 mt-2">Are you sure to delete this account?<br />
                    Reason: {isDeleteOpen}
                </p>
                    <div className="mt-5 flex gap-2 justify-end text-white">
                        <button className="p-1 px-2 rounded-xl border-2 text-gray-500" onClick={() => setDeleteOpen(false)}>Cancel</button>
                        <button className="p-1 px-4 rounded-xl bg-red-600" onClick={handleDeleteAccount}>Delete</button>
                    </div>
                </div>
        </div>
    )
}

export default DeleteAlert
