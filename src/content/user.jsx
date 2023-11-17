import { useEffect } from "react";
import useAuthContext from "../context/AuthContext";
const User = () => {

    const {user,getUser,setRegis} = useAuthContext();
    

    useEffect(() => {
      setRegis(null)
      if(!user){
        getUser();
        console.log("di Home")
        console.log(user)
      }
      
    }, []);
    return (
      <div className="container">
       
          <div id="container__article-list">
              <h1>Selamat Datang, {user?user:"guest"}</h1>
            </div>
      </div>
    );
  }
  
  
export default User;
  