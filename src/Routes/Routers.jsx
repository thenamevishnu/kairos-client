import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "../Pages/LandingPage"
import SignupPage from "../Pages/SignupPage"
import LoginPage from "../Pages/LoginPage"
import ProtectedRoute from "../ProtectedRoute"
import FaqPage from "../Pages/FaqPage"
import SessionsPage from "../Pages/SessionsPage"
import BookNowPage from "../Pages/BookNowPage"
import BookingsPage from "../Pages/BookingsPage"
import PageNotFoundPage from "../Pages/PageNotFoundPage"

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route exact path="" element={<LandingPage />} />
                    <Route path="faq" element={<FaqPage />} />

                    <Route path="sessions">
                        <Route exact path="" element={<ProtectedRoute><SessionsPage /></ProtectedRoute>} />
                        <Route path="book" element={<ProtectedRoute><BookNowPage /></ProtectedRoute>} />
                        <Route path="bookings" element={<ProtectedRoute><BookingsPage /></ProtectedRoute>} />
                    </Route>

                    <Route path="signup" element={<ProtectedRoute noAuth><SignupPage /></ProtectedRoute>} />
                    <Route path="login" element={ <ProtectedRoute noAuth><LoginPage /></ProtectedRoute> } />
                </Route>

                <Route path="*" Component={PageNotFoundPage}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routers
