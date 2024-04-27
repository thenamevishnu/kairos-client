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

export const initialRedux = {
    id: "",
    name: "",
    picture: "",
    email: "",
    username: ""
}

export const sessionTimings = [
    {
        from: "09:30",
        to: "11:00"
    }, {
        from: "11:30",
        to: "13:00"
    }, {
        from: "14:00",
        to: "15:30"
    }, {
        from: "16:00",
        to: "17:30"
    }
]