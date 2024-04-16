import { errorMessage } from "../Utils/Helper"
import { api } from "../axios"

export const getSessions = async () => {
    try {
        const { data: response } = await api.get(`/mentor/sessions`)
        if (response?.result) return response
        return { message: response?.message }
    } catch (err) {
        return { message: errorMessage(err)}
    }
}

export const bookMentor = async (bookData) => {
    try {
        const { data: response } = await api.post(`/mentor/book`, bookData)
        if (response?.status == "OK") return response
        return { message: response?.message }
    } catch (err) {
        return { message: errorMessage(err)}
    }
}

export const getBookings = async (userId) => {
    try {
        const { data: response } = await api.get(`/mentor/bookings/${userId}`)
        if (response?.result) return response
        return { message: response?.message }
    } catch (err) {
        return { message: errorMessage(err)}
    }
}