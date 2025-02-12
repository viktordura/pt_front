import { createContext, useState } from "react";

const LoaderContext = createContext();

const LoaderContextProvider = ({children})=>{

    const [loader, setLoaderInner] = useState(false);

    return(
        <LoaderContext.Provider value={{loader, setLoaderInner}}>
            {children}
        </LoaderContext.Provider>
    )
}

export {LoaderContext, LoaderContextProvider};