
const HeroSection = () => {
    return (
        <div className="bg-primaryGreen px-2 md:px-10 pt-12 pb-10">
            <div className="bg-mainGreen flex flex-col md:flex-row rounded-xl">
                <div className="w-full flex justify-center items-center">
                    <div className="text-center w-10/12 mt-5 md:mt-0">
                        <h1 className="font-bold text-3xl text-white whitespace-pre-wrap">Unlock Your Learning Potential With KAIROZ</h1>
                        <p className="text-white italic mt-4 text-sm">Unleash the power of KAIROZ to propel your learning journey beyond limits. Discover new horizons and embrace endless possibilities for growth and knowledge</p>
                    </div>
                </div>
                <div className="flex justify-center md:justify-self-auto">
                    <img src="./student.png" alt="student image" className="w-96 md:w-auto"/>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
