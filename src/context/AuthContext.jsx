import {createContext, useContext, useState} from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

const AuthContext = createContext({});

export const AuthProvider =({children}) => {
    const[user, setUser] = useState(null);
    const[regis, setRegis] = useState(null);
    const[tokens, setTokens] = useState("");

    const [errors, setErros]= useState([]);

    const navigate = useNavigate();

    const csrf =()=> axios.get("/sanctum/csrf-cookie")

    const getUser = async () => {
        const token = Cookies.get('tokenku')
        const data = await axios.get('/api/identify',{ headers: {"Authorization" : `Bearer ${token}`} });

        setUser(data.data.data.name);
        
        console.log("di Auth")
        console.log(data.data.data.name)
    }

    const login = async ({...data}) =>{
        await csrf();
        try {
            const response = await axios.post('/api/login',data);
            console.log(response.data.data.token)
            Cookies.set('tokenku', response.data.data.token)
            setRegis(null)
            getUser();
            navigate("/");
        } catch (e) {
            if(e.response.status === 422){
                setErros(e.response.data.errors)

            } else if (e.response.status === 404){
                setErros(e.response.data.data)
            }
        }
    }

    const logout = () =>{
        const token = Cookies.get('tokenku')
        axios.get('/api/logout',{ headers: {"Authorization" : `Bearer ${token}`} }).then(() =>{
            setUser(null)
            }
        );

    }
    const register = async ({...data}) =>{
        
        await csrf();
        try {
            await axios.post('/api/register',data);
            
           
            setRegis(data.name)
            setErros([])
            navigate("/login");
           
            
        } catch (e) {
            if(e.response.status === 422){
                setErros(e.response.data.errors)

            } else if (e.response.status === 404){
                setErros(e.response.data.data)
                console.log(errors)
            }
        }
    };

    return <AuthContext.Provider value={{user,errors,regis,getUser,login,logout,register}}>
        {children}
    </AuthContext.Provider>
}

export default function useAuthContext() {
    return useContext(AuthContext);
}