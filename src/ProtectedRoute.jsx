import { getToken } from "./Utils/Helper"
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children, noAuth }) => {

    const token = getToken()
    const location = useLocation()

    if (token) {
        if (noAuth) {
            return <Navigate to={"/"} />
        }
        return children
    } else {
        if (noAuth) {
            return children
        }
        return <Navigate to={`/login?next=${location?.pathname ? location.pathname : "/"}`} />
    }

    
}

export default ProtectedRoute
