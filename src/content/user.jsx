import { useEffect } from "react";
import useAuthContext from "../context/AuthContext";
const User = () => {

    const {user,getUser,setRegis} = useAuthContext();
    

    useEffect(() => {
      setRegis(null)
      if(!user){
        getUser();
      }
      
    }, [user]);
    return (
      <>
       
          
              <h1>Selamat Datang, {user?user.name:"guest"}</h1>
            
      </>
    );
  }
  
  
export default User;
  