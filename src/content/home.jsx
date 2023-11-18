import { useEffect } from "react";
import useAuthContext from "../context/AuthContext";
const Home = () => {

    const {setRegis} = useAuthContext();
    

    useEffect(() => {
      setRegis(null)
    
      
    }, []);
    return (
      <div className="container">
       
          <div id="container__article-list">
              <h1>Hi, Guest</h1>
            </div>
      </div>
    );
  }
  
  
export default Home;
  