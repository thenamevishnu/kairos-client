
const Footer = () => {
    return (
        <div className="bg-mainGreen px-2 md:px-10 text-white p-5">
            <div className="grid sm:grid-cols-4 grid-cols-2 text-center">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl">KAIROS</h1>
                    <ul className="mt-5 text-xl flex gap-5">
                        <li><i className="fab fa-instagram"/></li>
                        <li><i className="fab fa-linkedin"/></li>
                        <li><i className="fab fa-telegram"/></li>
                        <li><i className="fab fa-whatsapp"/></li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li className="text-md font-bold mb-5">Company</li>
                        <li className="mb-3">About Us</li>
                        <li className="mb-3">Contact Us</li>
                        <li>Pricing</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li className="text-md font-bold mb-5">Company</li>
                        <li className="mb-3">About Us</li>
                        <li className="mb-3">Contact Us</li>
                        <li>Pricing</li>
                    </ul>
                </div>
                <div className="mt-10 sm:mt-0">
                    <ul>
                        <li className="text-md font-bold mb-5">Company</li>
                        <li className="mb-3">About Us</li>
                        <li className="mb-3">Contact Us</li>
                        <li>Pricing</li>
                    </ul>
                </div>
            </div>
            <div className="border-b-2 pt-6"></div>
            <p className="text-center mt-5"><i className="fa fa-copyright" /> 2023 - { new Date().getFullYear() } | All Rights Reserved</p>
        </div>
    )
}

export default Footer
