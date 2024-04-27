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

export const profileUpdate = async (formData) => {
    try {
        const { data: response } = await api.patch(`/user/profile/update`, formData)
        if (response?.status == "OK") return response
        return { message: response?.message }
    } catch (err) {
        return { message: errorMessage(err)}
    }
}

export const passwordUpdate = async (newPassword) => {
    try {
        const { data: response } = await api.patch(`/user/profile/password/update`, newPassword)
        if (response?.status == "OK") return response
        return { message: response?.message }
    } catch (err) {
        return { message: errorMessage(err)}
    }
}

export const deleteAccount = async (user_id, reason) => {
    try {
        const { data: response } = await api.delete(`/user/profile/delete/${user_id}?reason=${reason}`)
        if (response?.status == "OK") return response
        return { message: response?.message }
    } catch (err) {
        return { message: errorMessage(err)}
    }
}

export const resetPassword = async (email) => {
    try {
        const { data: response } = await api.patch(`/user/password/reset`, email)
        if (response?.status == "OK") return response
        return { message: response?.message }
    } catch (err) {
        return { message: errorMessage(err)}
    }
}