import { createContext } from "react";
import axios from "axios";

export const AxiosContext = createContext();

export const AxiosProvider = ({children})=>{
    const axiosInstance = axios.create({
        baseURL: "http://localhost:5001",  // ⭐ your template
        withCredentials: true,             // important if working with cookies (JWT)
        });
         const value={
                
                
                axios:axiosInstance,
        
            }
            return (
                <AxiosContext.Provider value={value}>
                    {children}
                </AxiosContext.Provider>
            )

}