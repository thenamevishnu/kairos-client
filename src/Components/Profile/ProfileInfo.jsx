import { Fragment } from "react"

const ProfileInfo = ({ formData, isEditable, reduxData, handleEdit, setEditable, setFormData }) => {
    
    const { type } = reduxData

    return (
        <div className="border-2 rounded-xl md:w-[800px] w-full">
            <form className="p-4" onSubmit={(e) => e.preventDefault()}>
                <h1 className="text-start mb-5">Profile Information</h1>
                <div className="bg-gray-100 flex items-center w-full rounded-xl">
                    <i className="fa fa-user p-2" />
                    <input type="text" placeholder="Name" className="p-2 rounded-xl outline-none bg-transparent w-full" value={formData.name} name="name"  onChange={(e) => isEditable && setFormData({...formData, [e.target.name]: e.target.value})}/>
                </div>
                <div className="bg-gray-100 mt-3 flex items-center w-full rounded-xl">
                    <i className="fa fa-at p-2" />
                    <input type="text" placeholder="Username" className="p-2 rounded-xl outline-none bg-transparent w-full" value={formData.username} name="username"  onChange={(e) => isEditable && setFormData({...formData, [e.target.name]: e.target.value})}/>
                </div>
                <div className="bg-gray-100 mt-3 flex items-center w-full rounded-xl">
                    <i className="fa fa-envelope p-2" />
                    <input type="text" placeholder="Email" className="p-2 rounded-xl outline-none bg-transparent w-full" defaultValue={formData.email} name="email" />
                </div>
                <div className="bg-gray-100 mt-3 flex items-center w-full rounded-xl">
                    <i className={`fa fa-${type=="mentor"?"chalkboard-user":"school"} p-2`} />
                    <input type="text" placeholder="Account Type" className="p-2 rounded-xl outline-none bg-transparent w-full" defaultValue={type.toUpperCase()}/>
                </div>
                <div className="flex justify-start mt-5">
                    <button onClick={() => isEditable ? handleEdit() : setEditable(true)} className="bg-purple-700 text-white p-1 px-2 rounded-lg">{ isEditable ? <Fragment><i className="fa fa-save"/> Save Changes</Fragment> : <Fragment><i className="fa fa-edit"/> Edit Information</Fragment> }</button>
                </div>
            </form>
        </div>
    )
}

export default ProfileInfo
