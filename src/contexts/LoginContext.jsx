import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {

    let id

    const getId = async (id) => {

        id = await AsyncStorage.getItem('userId')

    }

    const [sessionId, setSessionId] = useState(id)


    return (
        <LoginContext.Provider value={{sessionId, setSessionId}}>
            {children}
        </LoginContext.Provider>
    )
}