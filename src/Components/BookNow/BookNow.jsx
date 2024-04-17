import { Fragment, useState } from "react"
import Header from "../Header/Header"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import { bookMentor } from "../../Services/mentor"

const BookNow = () => {

    const { name, id, email } = useSelector(state => state.user)
    const { state: selectedMentor } = useLocation()
    const [formData, setFormData] = useState({
        mentorId: selectedMentor?._id,
        name: name,
        domain: selectedMentor?.domain,
        mentorMail: selectedMentor?.email,
        date: "",
        start: "",
        end: ""
    })

    const navigate = useNavigate()

    const handleStartTime = (event) => {
        const timeSplit = event.target.value.split(":")
        setFormData({ ...formData, [event.target.name]: event.target.value, end: `${parseInt(timeSplit[1]) == "00" ? parseInt(timeSplit[0])+1 : parseInt(timeSplit[0])+2}:${timeSplit[1] == 30 ? "00" : 30}` })
    }

    const handleBooking = async (event) => {
        event.preventDefault()
        const bookData = { ...formData, studentMail: email, user: id, date: Math.floor(new Date(formData.date).getTime()/1000) }
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
            <Header search={ true } />
            <div className="w-screen flex justify-center mt-20 px-2 md:px-0">
                <form className="w-full bg-primaryGreen sm:w-[500px] rounded-xl p-4" onSubmit={handleBooking}>
                    <h1 className="text-center text-2xl">Book {selectedMentor?.name }</h1>
                    <div className="mt-3 w-full bg-white flex items-center border-2 rounded-xl">
                        <label><i className="fa fa-envelope p-3 text-lightGreen" /></label>
                        <input disabled type="text" name="name" placeholder="Name" className="w-full bg-white p-3 rounded-xl outline-none" value={formData.name} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                    </div>
                    <div className="mt-3 w-full bg-white flex items-center border-2 rounded-xl">
                        <label><i className="fa fa-code p-3 text-lightGreen" /></label>
                        <input disabled type="text" name="domain" placeholder="Domain" className="w-full bg-white p-3 rounded-xl outline-none" value={formData.domain} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                    </div>
                    <div className="mt-3 w-full bg-white flex items-center border-2 rounded-xl">
                        <label><i className="fa fa-calendar p-3 text-lightGreen" /></label>
                        <input type="date" name="date" placeholder="Date" className="w-full bg-white p-3 rounded-xl outline-none" value={formData.date} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})}/>
                    </div>
                    <div className="mt-3 w-full gap-3 flex items-center rounded-xl">
                        <div className="w-1/2 flex bg-white items-center border-2 rounded-xl">
                            <label><i className="fa fa-clock p-3 text-lightGreen" /></label>
                            <select name="start" className="w-full bg-white rounded-xl p-3 outline-none decoration-white" value={formData.start} onChange={(event) => handleStartTime(event)}>
                                    <option value="00:00">Start Time</option>
                                {
                                    selectedMentor?.available_time?.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <option value={item.from}>{ item.from }</option>
                                            </Fragment>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="w-1/2 flex bg-white items-center border-2 rounded-xl">
                            <label><i className="fa fa-clock p-3 text-lightGreen" /></label>
                            <input type="time" name="end" placeholder="End Time" className="w-full bg-white rounded-xl p-3 outline-none" value={formData.end} onChange={(event) => setFormData({...formData, [event.target.name]: event.target.value})} disabled/>
                        </div>
                    </div>
                    <div className="mt-3 text-center">
                        <button className="p-2 bg-lightGreen mb-3 w-full rounded-xl text-white"><i className="fa fa-thumbs-up"/> Book</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default BookNow
