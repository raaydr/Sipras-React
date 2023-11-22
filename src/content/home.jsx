import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
const Home = () => {
    const navigate = useNavigate();
    const {user,getUser} = useAuthContext();
    

    useEffect(() => {
      if(user){
        return navigate("/Welcome");
      }else{
        console.log(user)
        return navigate("/Login");
      }
    }, []);
    
    
  }
  
  
export default Home;
  