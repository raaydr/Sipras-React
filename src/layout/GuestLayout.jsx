import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import { useEffect } from "react";
import { initFlowbite } from 'flowbite';
const GuestLayout = () => {
    useEffect(() => {
      initFlowbite();
        
      }, []);
    
    return <Outlet/>

}
export default GuestLayout;