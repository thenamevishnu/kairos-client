
const HowWorks = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 text-lightGreen gap-3 px-2 text-center md:px-10 mt-10">
            <div className="border-2 border-lightGreen border-opacity-50 p-5 rounded-xl">
                <i className="fa fa-address-card text-3xl"/>
                <h1 className="text-xl mb-3 mt-3">Create Your Profile</h1>
                <p className="italic text-sm">Craft your unique profile to showcase your skills and aspirations, paving the way for tailored learning experiences.</p>
                <button className="bg-lightGreen text-white p-1 px-3 rounded-lg mt-5">Get Started</button>
            </div>
            <div className="border-2 border-lightGreen border-opacity-50 p-5 rounded-xl">
                <i className="fa fa-search text-3xl"/>
                <h1 className="text-xl mb-3 mt-3">Search Courses</h1>
                <p className="italic text-sm">Navigate through a vast array of courses, finding the perfect fit to fuel your intellectual curiosity and career aspirations.</p>
                <button className="bg-lightGreen text-white p-1 px-3 rounded-lg mt-5">Get Started</button>
            </div>
            <div className="border-2 border-lightGreen border-opacity-50 p-5 rounded-xl">
                <i className="fa fa-search text-3xl"/>
                <h1 className="text-xl mb-3 mt-3">Connect Mentors</h1>
                <p className="italic text-sm">Bridge the gap between aspiration and achievement by connecting with experienced mentors who can provide invaluable guidance and support.</p>
                <button className="bg-lightGreen text-white p-1 px-3 rounded-lg mt-5">Get Started</button>
            </div>
        </div>
    )
}

export default HowWorks
