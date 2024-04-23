import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const PeerContext = createContext()

export const PeerProvider = ({ children }) => {
    
    const [remoteStreams, setRemoteStreams] = useState(null)
    
    const servers = [
        {
            urls: [
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302"
            ]
        }
    ]

    const peer = useMemo(() => new RTCPeerConnection({
        iceServers: servers
    }))

    const createOffer = async () => {
        const offer = await peer.createOffer()
        await peer.setLocalDescription(offer)
        return offer
    }

    const createAnswer = async (offer) => {
        await peer.setRemoteDescription(offer)
        const answer = await peer.createAnswer()
        await peer.setLocalDescription(answer)
        return answer
    }

    const setRemoteAnswer = async (answer) => {
        await peer.setRemoteDescription(answer)
    }

    const sendStream = async (streams) => {
        if (Array.isArray(streams)) {
            for (const stream of streams) {
                const tracks = stream.getTracks()
                for (const track of tracks) {
                    peer.addTrack(track, stream)
                }
            }
        } else {
            const tracks = streams.getTracks()
            for (const track of tracks) {
                peer.addTrack(track, streams)
            }
        }
    }

    const handleTrackEvent = useCallback(event => {
        const streams = event.streams
        sendStream(streams)
        setRemoteStreams(streams)
    }, [])

    useEffect(() => {
        peer.addEventListener("track", handleTrackEvent)
        return () => {
            peer.removeEventListener("track", handleTrackEvent)
        }
    })

    return (
        <PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStreams }}>
            {children}
        </PeerContext.Provider>
    )
}

export const usePeer = () => {
    return useContext(PeerContext)
}