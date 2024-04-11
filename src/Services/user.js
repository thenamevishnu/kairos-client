import { errorMessage } from "../Utils/Helper"
import { api } from "../axios"

export const createUser = async (formData) => {
    try {
        const { data: response } = await api.post(`/user/create`, formData)
        if (response?.result) return response
        return { message: response?.message }
    } catch (err) {
        return { message: errorMessage(err)}
    }
}

export const loginUser = async (formData) => {
    try {
        const { data: response } = await api.get(`/user/login`, {
            params: formData
        })
        if (response?.result) return response
        return { message: response?.message }
    } catch (err) {
        return { message: errorMessage(err)}
    }
}