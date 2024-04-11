import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateUser } from "../../Redux/UserSlice/User"
import toast from "react-hot-toast"

const Header = ({ search=true }) => {

    const { id } = useSelector(state => state.user)
    const naviagte = useNavigate()
    const dispatch = useDispatch()

    const login = () => {
        naviagte("/login")
    } 
        
    const logout = () => {
        toast.success("Logging out...")
        setTimeout(() => {
            dispatch(updateUser({
                id: "",
                name: "",
                picture: "",
                email: "",
                username: ""
            }))
            naviagte("/login")
        }, 1500);
    }

    return (
        <div className="h-16 px-2 md:px-10 flex justify-between items-center bg-primaryGreen">
            <div className="text-green-700 font-bold text-xl cursor-pointer" onClick={() => naviagte("/")}>KAIROZ</div>
            <div className={`shadow-sm hidden md:${search ? "block" : "hidden"} rounded-xl bg-white`}><i className="fa fa-search px-3 text-gray-400"/><input type="text" placeholder="query..." className="outline-none rounded-xl md:w-[250px] lg:w-[350px] xl:w-[450px] p-2" /></div>
            <div className="md:flex gap-5 items-center hidden">
                <span>Home</span>
                <span>About</span>
                <span>Courses</span>
                <button className={ `${id ? `bg-red-600` : `bg-[#136E61]`} p-1 rounded-md px-3 text-white` } onClick={id ? logout : login}>{id ? `Logout` : `Login`}</button>
            </div>
            <div className="block md:hidden relative">
                <i className="fa fa-bars text-xl" />
            </div>
        </div>
    )
}

export default Header
