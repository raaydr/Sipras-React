import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import { useEffect } from "react";


const AuthLayout = () => {
    const {user,getUser} = useAuthContext();
    useEffect(() => {
        getUser()
      }, []);
    
    console.log(user)
    return user ? <Outlet/> : <Navigate to ="/login"/>

}
export default AuthLayout;