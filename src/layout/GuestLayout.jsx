import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import { useEffect } from "react";
import { initFlowbite } from 'flowbite';
const GuestLayout = () => {
   
    const {user,getUser} = useAuthContext();
    useEffect(() => {
      initFlowbite();
        getUser()
      }, []);
    
    return !user ? <Outlet/> : <Navigate to ="/Welcome"/>

}
export default GuestLayout;