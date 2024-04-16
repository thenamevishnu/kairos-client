import { Fragment, useState } from "react"
import Header from "../Header/Header"

const Faq = () => {

    const [opened, setOpened] = useState(-1)

    return (
        <Fragment>
            <Header search={true} />
            <div className="w-screen pt-28 pb-10 bg-primaryGreen px-2 md:px-10">
                <div className="bg-mainGreen rounded-xl p-5 py-20 text-center">
                    <h1 className="text-white text-2xl">FAQ - Frequently Asked Questions!</h1>
                </div>
            </div>
            <div className="mt-14 flex justify-center w-full px-2 md:px-10">
                <div className="w-full md:w-auto">
                    {
                        new Array(10).fill(0).map((_, index) => index).map(item => {
                            return (
                                <div key={item} onClick={() => setOpened(opened==item?-1:item)} className="w-full mb-4 md:w-[700px] border-lightGreen border-2 p-2 rounded-xl text-xl border-opacity-50 text-justify px-4 whitespace-pre-wrap cursor-pointer">How this work?
                                    <div className={`text-base italic overflow-hidden transition-all duration-300 ease-linear ${opened==item?"h-auto mt-3":"h-0 mt-0"}`}>skjdfkjshdfkjhsdkfjhskjdfhksjdhfkj</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default Faq
