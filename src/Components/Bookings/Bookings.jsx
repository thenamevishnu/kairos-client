import { Fragment, useEffect, useState } from "react"
import Header from "../Header/Header"
import { getBookings } from "../../Services/mentor"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"

const Bookings = () => {

    const { id: userId} = useSelector(state => state.user)
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getBookings(userId)
            if (response?.result) {
                setBookings(response.result)
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
            <div className="mt-14 flex justify-center w-full px-2 md:px-10">
            <div className="flex gap-5 flex-wrap mt-5 justify-center px-2 md:px-10">
                {
                    bookings?.map(item => {
                        return (
                            <div key={item._id} className="p-4 border-2 text-center border-lightGreen border-opacity-50 rounded-xl">
                                <div className="w-[200px] mb-3">
                                    <img src={item?.cover} className="rounded-xl"/>
                                </div>
                                <h1>{ item.mentorInfo?.[0].domain }</h1>
                                <p>Mentor: {item.mentorInfo?.[0].name} </p>
                                <p>Date: {new Date(item.date * 1000).toLocaleDateString("en-IN")}</p>
                                <p>Time: {item.time.from} - {item.time.to}</p>
                                <button onClick={() => naviagte("/sessions/join")} className="bg-lightGreen p-1 px-3 text-white rounded-lg mt-4 w-full flex items-center justify-center"><i className="fa fa-video mr-2"/> Join Meet</button>
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
