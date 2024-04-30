import { Fragment, useEffect, useState } from "react"
import Header from "../Header/Header"
import { getBookings, getMentorBookings } from "../../Services/session"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import Loader from "../Loader/Loader"

const Bookings = () => {

    const { id: userId, type: account_type } = useSelector(state => state.user)
    const [bookings, setBookings] = useState([])
    const [isLoading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = account_type == "student" ? await getBookings(userId) : await getMentorBookings(userId)
            if (response?.result) {
                setTimeout(() => {
                    setLoading(false)
                    setBookings(response.result)
                }, 1200)
            } else {
                return toast.error(response?.message)
            }
        }
        fetchData()
    }, [])

    return (
        <Fragment>
            <Header search={true} />
            <div className="w-screen pt-28 pb-10 bg-primaryGreen px-2 md:px-10">
                <div className="bg-mainGreen rounded-xl p-5 py-20 text-center">
                    <h1 className="text-white text-2xl">Bookings - My Bookings!</h1>
                </div>
            </div>
            <div className="mt-2 flex justify-center w-full px-2 md:px-10">
                <div className="flex gap-5 flex-wrap justify-center px-2 md:px-10">
                    {
                        isLoading && <Loader />
                    }
                    {
                        bookings?.map(item => {
                            return (
                                <div key={item._id} className="p-4 border-2 text-center border-lightGreen border-opacity-50 rounded-xl">
                                    <div className="w-[200px] mb-3">
                                        <img src={item?.cover} className="rounded-xl" />
                                    </div>
                                    <h1>{item.mentorInfo?.[0].domain}</h1>
                                    <p>Mentor: {item.mentorInfo?.[0].name} </p>
                                    <p>Date: {new Date(item?.sessionInfo?.[0].date * 1000).toLocaleDateString("en-IN")}</p>
                                    <p>Time: {item?.sessionInfo?.[0].time.from} - {item?.sessionInfo?.[0]?.time.to}</p>
                                    <p>MeetID: {item.roomId}</p>
                                    <div className="flex w-full gap-1 mt-2">
                                        <button onClick={() => navigate("/chat", {state: item})} className="bg-lightGreen p-1 px-3 w-1/2 text-white rounded-lg flex items-center justify-center"><i className="fa fa-message mr-2" /> Chat</button>
                                        <button onClick={() => navigate("/meet", {state: item})} className="bg-lightGreen p-1 px-3 w-1/2 text-white rounded-lg flex items-center justify-center"><i className="fa fa-video mr-2" /> Meet</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default Bookings
