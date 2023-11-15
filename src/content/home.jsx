import { useEffect } from "react";
import useAuthContext from "../context/AuthContext";
const Home = () => {

    const {user,getUser} = useAuthContext();

    useEffect(() => {
      if(!user){
        getUser();
        console.log("di Home")
        console.log(user)
      }
    }, []);
    return (
      <div className="container">
       
          <div id="container__article-list">
              <h1>Hi, {user?user:"guest"}</h1>
            </div>
      </div>
    );
  }
  
  
export default Home;
  