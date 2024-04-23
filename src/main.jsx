import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux"
import { Store, persistor } from './Redux/Store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from "react-hot-toast"
import { SocketProvider } from './Context/SocketIO.jsx'
import { PeerProvider } from './Context/PeerContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <SocketProvider>
            <PeerProvider>
                <Provider store={Store}>
                    <PersistGate loading={null} persistor={ persistor }>
                        <App />
                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />
                    </PersistGate>
                </Provider>
            </PeerProvider>
        </SocketProvider>
    // </React.StrictMode>,
)
