import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import User from "./UserSlice/User"
import { configureStore } from "@reduxjs/toolkit"

const persistConfig = {
    key: "root",
    storage
}

const persistedUserReducer = persistReducer(persistConfig, User)

export const Store = configureStore({
    reducer: {
        user: persistedUserReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(Store)