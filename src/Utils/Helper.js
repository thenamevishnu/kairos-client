export const errorMessage = (err) => {
    return err?.response?.data?.message || err?.message
}

export const setToken = (token) => {
    localStorage.setItem("_access_token_", token)
}

export const getToken = () => {
    return localStorage.getItem("_access_token_") || null
}

export const removeToken = () => {
    localStorage.removeItem("_access_token_")
}