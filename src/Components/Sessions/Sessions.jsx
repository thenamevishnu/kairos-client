import { Fragment, useEffect, useState } from "react"
import Header from "../Header/Header"
import { useNavigate } from "react-router-dom"
import { getSessions } from "../../Services/session"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import Loader from "../Loader/Loader"

const Sessions = () => {

    const { type: account_type, id: user_id } = useSelector(state => state.user)
    const [sessions, setSessions] = useState([])
    const naviagte = useNavigate()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const response = await getSessions(account_type, user_id)
            if (response?.result) {
                setTimeout(() => {
                    setLoading(false)
                    setSessions(response.result)
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
                    <h1 className="text-white text-2xl">Sessions - Available Sessions!</h1>
                </div>
            </div>
            <div className="flex gap-5 flex-wrap mt-2 justify-center px-2 md:px-10">
                
                {
                    isLoading && <Loader />
                }

                {
                    sessions?.map(item => {
                        return (
                            <div key={item._id} className="p-4 border-2 text-center border-lightGreen border-opacity-50 rounded-xl">
                                <div className="w-[200px] mb-3">
                                    <img src={item.cover} className="rounded-xl" />
                                </div>
                                <h1>{item.mentorInfo?.[0].domain}</h1>
                                <p>Mentor: {item.mentorInfo?.[0].name} </p>
                                <p>Date: { new Date(item.date * 1000).toLocaleDateString("en-IN") }</p>
                                <p>Time: {item.time.from} - {item.time.to}</p>
                                <p>Duration: 1hr 30sec</p>
                                <p>Slot available: 1</p>
                                <button onClick={() => account_type == "student" ? naviagte("/sessions/book", { state: item }) : naviagte("/sessions/edit", { state: item })} className="bg-lightGreen p-1 px-3 text-white rounded-lg mt-4 w-full flex items-center justify-center">{account_type == "student" ? <Fragment><i className="fa fa-video mr-2" /> Book Now</Fragment> : <Fragment><i className="fa fa-pen mr-2" /> Edit</Fragment>}</button>
                            </div>
                        )
                    })
                }
            </div>
        </Fragment>
    )
}

export default Sessions
