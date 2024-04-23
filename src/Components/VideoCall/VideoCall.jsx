import { Fragment, useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { useSocket } from "../../Context/SocketIO"
import toast from "react-hot-toast"
import ReactPlayer from "react-player"
import { usePeer } from "../../Context/PeerContext"
import Header from "../Header/Header"

const VideoCall = () => {

    const { id: userId, name, type } = useSelector(state => state.user)
    const { state } = useLocation()
    const { socket } = useSocket()
    const { sendStream, createOffer } = usePeer()
    const [myStream, setMyStream] = useState(null)
    const [playingSec, setPlayingSec] = useState(0)

    const getUserMediaStream = useCallback( async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        })
        sendStream(stream)
        setMyStream(stream)
    }, [])

    useEffect(() => {
        socket.emit("joinCall", {
            roomId: state?.roomId,
            userId: userId,
            name: name
        })
        getUserMediaStream()
    }, [state])

    const handleNewUser = useCallback( async ({ userId, name }) => {
        const offer = await createOffer()
        socket.emit("call-user", { offer, roomId: state?.roomId })
        return toast.success(`${name} join the meet!`)
    }, [createOffer, socket])

    useEffect(() => {
        socket.on("newUser", handleNewUser)
        return () => {
            socket.off("newUser", handleNewUser)
        }
    }, [socket])

    return (
        <Fragment>
            <Header search={true}/>
            <div className="gap-1 grid grid-cols-2 mt-16">
                <ReactPlayer url={myStream} onProgress={e => setPlayingSec(parseInt(e.playedSeconds))} playing width="100%" height="100%"/>  
                <ReactPlayer url={myStream} onProgress={e => setPlayingSec(parseInt(e.playedSeconds))} playing width="100%" height="100%"/>  
            </div>
            <div className="text-center">
                { playingSec } Seconds
            </div>
        </Fragment>
    )
}

export default VideoCall
