import { Fragment, useEffect, useState } from "react"
import Header from "../Header/Header"
import { useNavigate } from "react-router-dom"
import { getSessions } from "../../Services/mentor"
import toast from "react-hot-toast"

const Sessions = () => {

    const [sessions, setSessions] = useState([])
    const naviagte = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = await getSessions()
            if (response?.result) {
                setSessions(response.result)
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
            <div className="flex gap-5 flex-wrap mt-5 justify-center px-2 md:px-10">
                {
                    sessions?.map(item => {
                        return (
                            <div key={item._id} className="p-4 border-2 text-center border-lightGreen border-opacity-50 rounded-xl">
                                <div className="w-[200px] mb-3">
                                    <img src={item.cover} className="rounded-xl"/>
                                </div>
                                <h1>{ item.domain }</h1>
                                <p>Mentor: { item.name } </p>
                                <p>Duration: 1hr 30sec</p>
                                <button onClick={() => naviagte("/sessions/book", { state: item })} className="bg-lightGreen p-1 px-3 text-white rounded-lg mt-4 w-full flex items-center justify-center"><i className="fa fa-video mr-2"/> Book Now</button>
                            </div>
                        )
                    })
                }
           </div>
        </Fragment>
    )
}

export default Sessions
