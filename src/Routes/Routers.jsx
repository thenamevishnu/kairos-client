import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "../Pages/LandingPage"
import SignupPage from "../Pages/SignupPage"
import LoginPage from "../Pages/LoginPage"

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route exact path="" element={<LandingPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="login" element={ <LoginPage /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routers
