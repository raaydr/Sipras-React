import {createContext, useContext, useState, useEffect} from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

const AuthContext = createContext({});

export const AuthProvider =({children}) => {
    const[user, setUser] = useState([]);
    const[regis, setRegis] = useState(null);

    const [errors, setErrors]= useState([]);

    const navigate = useNavigate();

    const csrf =()=> axios.get("/sanctum/csrf-cookie")
    

    const getUser = async () => {
       
        
        try {
            const token = Cookies.get('tokenku')
            const response = await axios.get('/api/identify',{ headers: {"Authorization" : `Bearer ${token}`} });
    
            setUser(response.data.data);
            
        } catch (e) {
            if(e.response.status === 401){
                setUser(null);
                navigate("/Login");

            }
            
        }
    }

    const login = async ({...data}) =>{
        await csrf();
        try {
            setRegis(null)
            const response = await axios.post('/api/login',data);
            
            Cookies.set('tokenku', response.data.data.token)
            setRegis(null)
            navigate("/dashboard");
        } catch (e) {
            if(e.response.status === 422){
                setErrors(e.response.data.errors)

            } else if (e.response.status === 404){
                setErrors(e.response.data.data)
            }
        }
    }

    const logout = async ({}) =>{

        
        try {
            const token = Cookies.get('tokenku')
        axios.get('/api/logout',{ headers: {"Authorization" : `Bearer ${token}`} }).then(() =>{
            setUser(null)
            }
        );
        Cookies.set('tokenku', null)
           
            
        } catch (e) {
            
        }
        

    }
    const register = async ({...data}) =>{
        
        await csrf();
        try {
            await axios.post('/api/register',data);
            
           
            setRegis(data.name)
            setErrors([])
            navigate("/login");
           
            
        } catch (e) {
            if(e.response.status === 422){
                setErrors(e.response.data.errors)

            } else if (e.response.status === 404){
                setErrors(e.response.data.data)
                
            }
        }
    };

    
    return <AuthContext.Provider value={{user,errors,regis,setUser,setRegis,setErrors,getUser,login,logout,register,csrf,navigate,
    }}>
        {children}
    </AuthContext.Provider>
}

export default function useAuthContext() {
    return useContext(AuthContext);
}