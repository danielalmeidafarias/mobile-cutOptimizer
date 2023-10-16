import { createContext, useState } from "react";

export const URLContext = createContext()

export const URLContextProvider = ({ children }) => {
    const [url, setUrl] = useState('https://cutoptimizerapi.onrender.com/')

    return (
        <URLContext.Provider value={{url}}> 
            {children}
        </URLContext.Provider>
    )
}

