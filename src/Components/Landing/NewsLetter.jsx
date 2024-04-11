
const NewsLetter = () => {
    return (
        <div className="bg-primaryGreen mt-20 py-6 flex justify-center relative">
            <div className="w-20 h-20 bg-lightGreen rounded-full opacity-30 pointer-events-none animate-floating absolute top-3 right-3"></div>
            <div className="w-20 h-20 bg-lightGreen rounded-full opacity-30 pointer-events-none animate-floating absolute bottom-3 left-3"></div>
            <div className="text-lightGreen text-center p-5">
                <h1 className="text-2xl">Subscribe Our Newsletter</h1>
                <p className="italic text-base">Join now to receive persanalized reccommendations from KAIROS</p>
                <div className="flex rounded-lg mt-7">
                    <input type="text" placeholder="Enter you email..." className="p-2 outline-none w-full rounded-lg" />
                    <button className="p-2 px-3 bg-lightGreen text-white rounded-lg">Subscribe</button>
                </div>
            </div>            
        </div>
    )
}

export default NewsLetter
