import { Fragment, useState } from "react"
import Header from "../../Header/Header"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import { bookMentor } from "../../../Services/session"

const BookNow = () => {

    const { name, id, email } = useSelector(state => state.user)
    const { state: selectedSession } = useLocation()
    const [formData, setFormData] = useState({
        session: selectedSession?._id,
        mentorId: selectedSession?.mentor,
        name: selectedSession?.mentorInfo?.[0].name,
        domain: selectedSession?.mentorInfo?.[0].domain || "MERN",
        mentorMail: selectedSession?.mentorInfo?.[0].email,
        date: new Date(selectedSession?.date * 1000).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).split("/").reverse().join("-"),
        start: selectedSession?.time?.from,
        end: selectedSession?.time?.to
    })

    const navigate = useNavigate()

    const handleBooking = async (event) => {
        event.preventDefault()
        const bookData = { ...formData, studentMail: email, student: id, date: selectedSession?.date }
        for (let key in formData) {
            if (!formData[key]) {
                return toast.error(`${key.replace(key.charAt(0), key[0].toUpperCase())} is empty!`)
            }
        }
        const response = await bookMentor(bookData)
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
                    <h1 className="text-center text-2xl">Book {selectedSession?.name}</h1>
                    <div className="mt-3 w-full bg-white flex items-center border-2 rounded-xl">
                        <label><i className="fa fa-envelope p-3 text-lightGreen" /></label>
                        <input disabled type="text" name="name" placeholder="Name" className="w-full bg-white p-3 rounded-xl outline-none" value={formData.name} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} />
                    </div>
                    <div className="mt-3 w-full bg-white flex items-center border-2 rounded-xl">
                        <label><i className="fa fa-code p-3 text-lightGreen" /></label>
                        <input disabled type="text" name="domain" placeholder="Domain" className="w-full bg-white p-3 rounded-xl outline-none" value={formData.domain} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} />
                    </div>
                    <div className="mt-3 w-full bg-white flex items-center border-2 rounded-xl">
                        <label><i className="fa fa-calendar p-3 text-lightGreen" /></label>
                        <input disabled type="date" name="date" placeholder="Date" className="w-full bg-white p-3 rounded-xl outline-none" value={formData.date} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} />
                    </div>
                    <div className="mt-3 w-full gap-3 flex items-center rounded-xl">
                        <div className="w-1/2 flex bg-white items-center border-2 rounded-xl">
                            <label><i className="fa fa-clock p-3 text-lightGreen" /></label>
                            <input type="time" name="start" placeholder="Start Time" className="w-full bg-white rounded-xl p-3 outline-none" value={formData.start} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} disabled />
                        </div>
                        <div className="w-1/2 flex bg-white items-center border-2 rounded-xl">
                            <label><i className="fa fa-clock p-3 text-lightGreen" /></label>
                            <input type="time" name="end" placeholder="End Time" className="w-full bg-white rounded-xl p-3 outline-none" value={formData.end} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} disabled />
                        </div>
                    </div>
                    <div className="mt-3 text-center">
                        <button className="p-2 bg-lightGreen mb-3 w-full rounded-xl text-white"><i className="fa fa-thumbs-up" /> Book</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default BookNow
