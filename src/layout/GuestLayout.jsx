import { Navigate, Outlet } from "react-router-dom";

import { useEffect } from "react";
import { initFlowbite } from 'flowbite';
const GuestLayout = () => {
    useEffect(() => {
      initFlowbite();
        
      }, []);
    return <Outlet/>

}
export default GuestLayout;