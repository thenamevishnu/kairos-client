import { createContext, useContext, useMemo } from "react"
import io from "socket.io-client"

const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    const socket = useMemo(() => io(import.meta.env.VITE_SERVER), [])
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    return useContext(SocketContext)
}