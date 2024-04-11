import { Fragment } from "react"
import HeroSection from "./HeroSection"
import Header from "../Header/Header"
import TrustedBy from "./TrustedBy"
import HowWorks from "./HowWorks"

const Landing = () => {
    return (
        <Fragment>
            <Header />
            <HeroSection />
            <TrustedBy />
            <HowWorks />
        </Fragment>
    )
}

export default Landing
