import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: "",
        name: "",
        picture: "",
        email: "",
        username: "",
        type: ""
    },
    reducers: {
        updateUser: (state, action) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.picture = action.payload.picture
            state.email = action.payload.email
            state.username = action.payload.username
            state.type = action.payload.type
        }
    }
})

export const { updateUser } = userSlice.actions
export default userSlice.reducer