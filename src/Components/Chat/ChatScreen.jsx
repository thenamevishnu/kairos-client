import { useCallback, useEffect, useRef, useState } from "react"

const ChatScreen = ({ selectedChat }) => {

    const chatRef = useRef(null)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState(selectedChat?.messages)

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTo({
                top: chatRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }, [messages])

    const scrollToTop = () => {
        if (chatRef.current) {
            if (chatRef.current.scrollTop == 0) {
                chatRef.current.scrollTo({
                    top: chatRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            } else {
                chatRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    }

    const handleSendMessage = useCallback((event) => {
        event.preventDefault()
        setMessages(prev => [...prev, { text: message, me: true, time: "10:10 PM" }])
        setMessage("")
    }, [message])

    return (
        <div className="w-screen h-screen flex justify-center text-white">
            <div className="w-full h-screen md:w-[500px]">
                <div className="h-[8vh] flex items-center justify-between bg-[#222] rounded-xl border-2">
                    <div className="flex items-center">
                        <img src={selectedChat.image} className="w-20 " />
                        <div>
                            <p>{selectedChat.name}</p>
                            <p className="text-green-700 text-sm">Online</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 pr-5">
                        <i className="fa fa-video" />
                        <i className="fa fa-phone"/>
                    </div>
                </div>
                <div className="h-[84vh] bg-[#222] border-2 relative rounded-xl overflow-auto" ref={chatRef} onDoubleClick={scrollToTop}>
                    {
                        messages?.map((item, index) => {
                            return (
                                <div key={index} className={ `${item.me ? "justify-end" : "justify-start"} relative flex my-2 px-2 cursor-pointer` }>
                                    <p className={`${item.me ? "bg-white text-black bg-opacity-65" : "bg-gray-700"} text-white rounded-xl p-2 md:max-w-[300px] max-w-[95%] break-words`}>{item.text} <span className="text-xs"><i className="fa fa-clock text-xs me-1"/>{ item.time }</span></p>
                                </div>
                            )
                        })
                    }
                </div>
                <form className="h-[8vh] px-2 flex items-center w-full gap-2 bg-[#222] rounded-xl border-2" onSubmit={handleSendMessage}>
                    <input placeholder="Message..." type="text" className="p-2 w-full rounded-xl outline-none text-gray-700" value={message} onChange={(e) => setMessage(e.target.value)}/>
                    <button className="p-2 bg-white rounded-full flex justify-center items-center w-10 h-10">
                        <i className="fa fa-paper-plane text-black cursor-pointer"/>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatScreen
