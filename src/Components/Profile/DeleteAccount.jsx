import { useState } from "react"
import toast from "react-hot-toast"

const DeleteAccount = ({ setDeleteOpen }) => {

    const [deleteReason, setDeleteReason] = useState("")
    const [showReasonInput, setShowReasonInput] = useState(false)
    const reasons = ["I don't find it useful", "I don't understand how it works", "I have created a second account", "Other"]

    const handleDeleteReason = (item) => {
        setDeleteReason(item)
        if (item == "Other") {
            setDeleteReason("")
            setShowReasonInput(true)
        } else {
            setShowReasonInput(false)
        }
    }

    const handleDeleteAccount = () => {
        if (!deleteReason || deleteReason.length < 10) {
            return toast.error("Enter valid reason")
        }
        setDeleteOpen(deleteReason)
    }

    return (
        <div className="border-2 rounded-xl md:w-[800px] w-full">
            <form className="p-4" onSubmit={(e) => e.preventDefault()}>
                <h1 className="text-start mb-5">Delete Account</h1>
                {
                    reasons.map((item, index) => {
                        return (
                            <div key={index} className="flex items-center mb-2">
                                <p className={`w-5 h-5 rounded-full bg-gray-100 shadow shadow-black me-2 cursor-pointer ${(showReasonInput && item == "Other") && "bg-purple-700"} ${deleteReason == item && "bg-purple-700"}`} onClick={() => handleDeleteReason(item)} /> {item}
                            </div>
                        )
                    })
                }
                { showReasonInput && <textarea placeholder="Enter reason..." type="text" className="p-2 outline-none border-2 w-full rounded-xl resize-none mt-3" rows={3} value={deleteReason} onChange={(e) => setDeleteReason(e.target.value)}></textarea>}
                <div className="flex justify-start mt-5">
                    <button onClick={() => handleDeleteAccount() } className="bg-purple-700 text-white p-1 px-2 rounded-lg"><i className="fa fa-trash"/> Delete Account</button>
                </div>
            </form>
        </div>
    )
}

export default DeleteAccount
