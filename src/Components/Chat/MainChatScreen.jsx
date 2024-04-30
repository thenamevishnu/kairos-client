import { Fragment, useEffect, useState } from "react"
import ChatScreen from "./ChatScreen"
import { useSocket } from "../../Context/SocketIO"
import { useSelector } from "react-redux"

const MainChatScreen = () => {
    
    const { socket } = useSocket()
    const {id: user_id} = useSelector(state => state.user)
    
    useEffect(() => {
        socket.emit("join-chat", {user_id: user_id})
    }, [])

    const array = new Array(20).fill({
        name: "ALEXANDER", image: "./avatar.png", lastMessage: "Hi", time: "10:10 PM", messages: new Array(30).fill({text: "Hello", me: true, time: "10:10 PM"}).map((item, index) => index%2==0 ? {...item, me: false} : item)})
    const [selectedChat, setSelectedChat] = useState({})

    return (
        <Fragment>
            <div className="w-screen h-screen flex justify-center">
                {
                    Object.keys(selectedChat).length == 0 && <div className="overflow-auto w-full sm:w-[500px]">
                    {
                        array.map((item, index) => {
                            return (
                                <div onClick={() => setSelectedChat(item)} key={index} className="p-2 border-2 mb-0.5 rounded-xl relative cursor-pointer">
                                    <div className="absolute top-1 right-3 text-sm">{ item.time }</div>
                                    <div>
                                        <div className="flex">
                                            <img src={item.image} className="w-16" />
                                            <div>
                                                <h1>{item.name}</h1>
                                                <div className="text-sm itealic">{ item.lastMessage } <i className="fa fa-check-double text-[10px] text-sky-700"/></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                }
                {
                    Object.keys(selectedChat).length > 0 && <ChatScreen selectedChat={selectedChat} />
                }
            </div>
        </Fragment>
    )
}

export default MainChatScreen
