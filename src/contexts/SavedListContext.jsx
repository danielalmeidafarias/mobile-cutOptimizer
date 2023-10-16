import { createContext, useState } from "react";

export const SavedListContext = createContext()

export const ListContextProvider = ({ children }) => {
    const [savedList, setSavedList] = useState(null)

    const clearSavedList = () => {
        setSavedList(null)
    }

    return (
        <SavedListContext.Provider value={{savedList, setSavedList, clearSavedList}}> 
            {children}
        </SavedListContext.Provider>
    )
}

