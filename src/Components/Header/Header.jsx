import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Header = () => {

    const { id } = useSelector(state => state.user)
    const naviagte = useNavigate()

    return (
        <div className="w-screen h-16 fixed shadow shadow-gray-400 px-2 md:px-10 flex justify-between items-center">
            <div className="font-bold text-xl cursor-pointer" onClick={() => naviagte("/")}>KAIROS</div>
            <div>
                <div className="block md:hidden">
                    <i className="fa fa-bars cursor-pointer text-xl"/>
                </div>
                <div className="md:flex hidden gap-5 items-center">
                    <span className="cursor-pointer">Home</span>
                    <span className="cursor-pointer">About US</span>
                    <span className="cursor-pointer">Services</span>
                    { id ? <i className="fa fa-sign-out cursor-pointer text-red-500" /> : <button className="flex items-center bg-violet-700 text-white px-2 p-1 rounded-xl"><i className="fa fa-sign-in"/> &nbsp;Login</button> }
                </div>
            </div>
        </div>
    )
}

export default Header
