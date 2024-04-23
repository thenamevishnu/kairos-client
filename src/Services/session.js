import { errorMessage } from "../Utils/Helper"
import { api } from "../axios"

export const getSessions = async (type, user_id) => {
    try {
        const { data: response } = await api.get(`/session/sessions`, {
            params: {
                type: type,
                user_id: user_id
            }
        })
        if (response?.result) return response
        return { message: response?.message }
    } catch (err) {
        return { message: errorMessage(err)}
    }
}

export const createNewSession = async (formData) => {
    try {
        const { data: response } = await api.post(`/session/create`, formData)
        if (response?.status == "OK") return response
        return { message: response?.message }
    } catch (err) {
        return { message: errorMessage(err)}
    }
}

export const bookMentor = async (bookData) => {
    try {
        const { data: response } = await api.post(`/session/book`, bookData)
        if (response?.status == "OK") return response
        return { message: response?.message }
    } catch (err) {
        return { message: errorMessage(err)}
    }
}

export const getBookings = async (userId) => {
    try {
        const { data: response } = await api.get(`/session/bookings/${userId}`)
        if (response?.result) return response
        return { message: response?.message }
    } catch (err) {
        return { message: errorMessage(err)}
    }
}

export const getMentorBookings = async (mentor) => {
    try {
        const { data: response } = await api.get(`/session/mybookings/${mentor}`)
        if (response?.result) return response
        return { message: response?.message }
    } catch (err) {
        return { message: errorMessage(err)}
    }
}