import { Fragment } from "react"
import HeroSection from "./HeroSection"
import Header from "../Header/Header"
import TrustedBy from "./TrustedBy"
import HowWorks from "./HowWorks"
import NewsLetter from "./NewsLetter"
import Footer from "./Footer"

const Landing = () => {
    return (
        <Fragment>
            <Header />
            <HeroSection />
            <TrustedBy />
            <HowWorks />
            <NewsLetter />
            <Footer />
        </Fragment>
    )
}

export default Landing
