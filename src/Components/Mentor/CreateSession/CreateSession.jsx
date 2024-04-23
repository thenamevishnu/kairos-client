import { Fragment, useState } from "react"
import Header from "../../Header/Header"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import { bookMentor, createNewSession } from "../../../Services/session"
import { sessionTimings } from "../../../Utils/Helper"

const CreateSession = () => {

    const { id } = useSelector(state => state.user)
    const [formData, setFormData] = useState({
        mentor: id,
        date: "",
        start: "",
        end: ""
    })

    const handleStartTime = (event) => {
        const timeSplit = event.target.value.split(":")
        setFormData({ ...formData, [event.target.name]: event.target.value, end: `${parseInt(timeSplit[1]) == "00" ? parseInt(timeSplit[0]) + 1 : parseInt(timeSplit[0]) + 2}:${timeSplit[1] == 30 ? "00" : 30}` })
    }

    const handleBooking = async (event) => {
        event.preventDefault()
        const sessionData = { ...formData, date: Math.floor(new Date(formData.date).getTime() / 1000) }
        for (let key in formData) {
            if (!formData[key]) {
                return toast.error(`${key.replace(key.charAt(0), key[0].toUpperCase())} is empty!`)
            }
        }
        const response = await createNewSession(sessionData)
        if (response?.status == "OK") {
            return toast.success(response.message)
        } else {
            return toast.error(response.message)
        }
    }

    return (
        <Fragment>
            <Header search={true} />
            <div className="w-screen flex justify-center mt-20 px-2 md:px-0">
                <form className="w-full bg-primaryGreen sm:w-[500px] rounded-xl p-4" onSubmit={handleBooking}>
                    <h1 className="text-center text-2xl">Create New Session</h1>
                    <div className="mt-3 w-full bg-white flex items-center border-2 rounded-xl">
                        <label><i className="fa fa-calendar p-3 text-lightGreen" /></label>
                        <input type="date" name="date" placeholder="Date" className="w-full bg-white p-3 rounded-xl outline-none" value={formData.date} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} />
                    </div>
                    <div className="mt-3 w-full gap-3 flex items-center rounded-xl">
                        <div className="w-1/2 flex bg-white items-center border-2 rounded-xl">
                            <label><i className="fa fa-clock p-3 text-lightGreen" /></label>
                            <select name="start" className="w-full bg-white rounded-xl p-3 outline-none decoration-white" value={formData.start} onChange={(event) => handleStartTime(event)}>
                                <option value="00:00">Start Time</option>
                                {
                                    sessionTimings.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <option value={item.from}>{item.from}</option>
                                            </Fragment>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="w-1/2 flex bg-white items-center border-2 rounded-xl">
                            <label><i className="fa fa-clock p-3 text-lightGreen" /></label>
                            <input type="time" name="end" placeholder="End Time" className="w-full bg-white rounded-xl p-3 outline-none" value={formData.end} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} disabled />
                        </div>
                    </div>
                    <div className="mt-3 text-center">
                        <button className="p-2 bg-lightGreen mb-3 w-full rounded-xl text-white"><i className="fa fa-paper-plane" /> Create</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default CreateSession
