import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateUser } from "../../Redux/UserSlice/User"
import toast from "react-hot-toast"
import { removeToken } from "../../Utils/Helper"
import { Fragment, useState } from "react"

const Header = ({ search }) => {

    const { id, type, picture, name } = useSelector(state => state.user)
    const naviagte = useNavigate()
    const dispatch = useDispatch()
    const [showMenu, setMenu] = useState(false)

    const login = () => {
        naviagte("/login")
    } 
        
    const logout = () => {
        removeToken()
        dispatch(updateUser({
            id: "",
            name: "",
            picture: "",
            email: "",
            username: ""
        }))
        naviagte("/login")
    }

    return (
        <div className="h-16 px-2 fixed top-0 shadow-sm w-screen md:px-10 flex justify-between items-center bg-primaryGreen">
            <div className="text-green-700 font-bold text-xl cursor-pointer flex relative" onClick={() => naviagte("/")}>KAIROZ <p className="text-red-500 text-xs font-normal ms-1">{ type?.replace(type?.[0], type[0]?.toUpperCase()) }</p></div>
            <div className={`shadow-sm hidden ${search ? "md:block" : "md:hidden"} rounded-xl bg-white`}><i className="fa fa-search px-3 text-gray-400"/><input type="text" placeholder="query..." className="outline-none rounded-xl md:w-[450px] lg:w-[500px] xl:w-[600px] p-2" /></div>
            <div className="text-center relative">
                <img src={picture || "./avatar.png"} onClick={() => setMenu(prev => !prev)} className="rounded-full object-fill w-16 cursor-pointer" />
                <div className={`right-32 top-14 absolute flex flex-row whitespace-nowrap p-2 rounded-xl gap-4`}>
                    {
                        type && <Fragment>
                            <span className={`absolute shadow shadow-gray-600 ${showMenu ? `top-0` : `top-[-10rem]`} cursor-pointer transition-all duration-300 ease-linear delay-[0.05s] bg-white hover:bg-gray-700 w-32 hover:text-white rounded-md p-1 text-lightGreen`} onClick={() => type == "student" ? naviagte("/") : naviagte("/sessions/create")}>{type == "student" ? <Fragment><i className="fa fa-home"/> Home</Fragment> : <Fragment><i className="fa fa-circle-plus"/> Create</Fragment>}</span>
                            <span className={`absolute shadow shadow-gray-600 ${showMenu ? `top-12` : `top-[-10rem]`} cursor-pointer transition-all duration-300 ease-linear delay-[0.07s] bg-white hover:bg-gray-700 w-32 hover:text-white rounded-md p-1 text-lightGreen`} onClick={() => naviagte("/sessions/bookings")}> <i className="fa fa-history"/> Bookings</span>
                            <span className={`absolute shadow shadow-gray-600 ${showMenu ? `top-24` : `top-[-10rem]`} cursor-pointer transition-all duration-300 ease-linear bg-white delay-[0.09s] hover:bg-gray-700 w-32 hover:text-white rounded-md p-1 text-lightGreen`} onClick={() => naviagte("/sessions")}><i className="fa fa-list" /> { type == "mentor" ? "My " : "" }Sessions</span>
                        </Fragment>
                    }    
                    <button className={ `absolute shadow shadow-gray-600 ${showMenu ? `${type ? `top-36` : `top-0`}` : `top-[-10rem]`} ${id ? `text-red-600` : `text-[#136E61]`} transition-all duration-300 delay-[0.11s] ease-linear bg-white w-32 p-1 rounded-md px-3 hover:bg-gray-700 hover:text-white` } onClick={id ? logout : login}>{id ? <Fragment><i className="fa fa-sign-out"/> LogOut</Fragment> : <Fragment><i className="fa fa-sign-in"/> LogIn</Fragment>}</button>
                </div>
            </div>
        </div>
    )
}

export default Header
