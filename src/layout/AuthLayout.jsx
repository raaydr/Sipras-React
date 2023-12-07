import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import { useEffect } from "react";
import { initFlowbite } from 'flowbite';
import Cookies from "js-cookie"

const AuthLayout =  () => {
  const {user, getUser} = useAuthContext();  
    useEffect(() => {
      initFlowbite();
      
      getUser()
      
    }, []);
    return user ? <Outlet/> : <Navigate to ="/login"/>

}
export default AuthLayout;