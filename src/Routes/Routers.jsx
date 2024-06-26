import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "../Pages/LandingPage"
import SignupPage from "../Pages/SignupPage"
import LoginPage from "../Pages/LoginPage"
import ProtectedRoute from "../ProtectedRoute"
import FaqPage from "../Pages/FaqPage"
import SessionsPage from "../Pages/SessionsPage"
import PageNotFoundPage from "../Pages/PageNotFoundPage"
import BookNowPage from "../Pages/Student/BookNowPage"
import BookingsPage from "../Pages/BookingsPage"
import CreateSessionPage from "../Pages/Mentor/CreateSessionPage"
import VideoCallPage from "../Pages/VideoCallPage"
import ProfilePage from "../Pages/ProfilePage"
import PasswordResetPage from "../Pages/PasswordResetPage"
import ResetPasswordVerifyPage from "../Pages/ResetPasswordVerifyPage"
import MainChatScreenPage from "../Pages/MainChatScreenPage"

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route exact path="" element={<LandingPage />} />
                    <Route path="faq" element={<FaqPage />} />

                    <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    
                    <Route path="password">
                        <Route path="reset">
                            <Route path="" element={<PasswordResetPage />} />
                            <Route path="verify" element={ <ResetPasswordVerifyPage /> } />
                        </Route>

                    </Route>

                    <Route path="sessions">
                        <Route exact path="" element={<ProtectedRoute><SessionsPage /></ProtectedRoute>} />
                        <Route path="book" element={<ProtectedRoute><BookNowPage /></ProtectedRoute>} />
                        <Route path="bookings" element={<ProtectedRoute><BookingsPage /></ProtectedRoute>} />
                        <Route path="create" element={<ProtectedRoute><CreateSessionPage /></ProtectedRoute>} />
                    </Route>

                    <Route path="meet">
                        <Route exact path="" element={ <ProtectedRoute><VideoCallPage /></ProtectedRoute> } />
                    </Route>

                    <Route path="chat">
                        <Route exact path="" element={ <ProtectedRoute><MainChatScreenPage /></ProtectedRoute> } />
                    </Route>

                    <Route path="signup" element={<ProtectedRoute noAuth><SignupPage /></ProtectedRoute>} />
                    <Route path="login" element={<ProtectedRoute noAuth><LoginPage /></ProtectedRoute>} />
                </Route>

                <Route path="*" Component={PageNotFoundPage} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routers
