import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "../Pages/LandingPage"

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route exact path="" element={ <LandingPage/> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routers
