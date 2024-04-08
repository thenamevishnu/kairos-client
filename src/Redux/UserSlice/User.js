import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: "",
        name: "",
        picture: "",
        gmail: "",
        username: ""
    },
    reducers: {
        updateUser: (state, action) => {
            state.name = action.payload.name
            state.picture = action.payload.picture
            state.gmail = action.payload.gmail
            state.username = action.payload.username
        }
    }
})

export const { updateUser } = userSlice.actions
export default userSlice.reducer