import useAuthContext from "../context/AuthContext";
const User = () => {

    const {user} = useAuthContext();
    

   
    return (
      <>
       
          
              <h1>Selamat Datang, {user?user.name:"guest"}</h1>
            
      </>
    );
  }
  
  
export default User;
  