import React, { useState,useEffect,useRef } from "react";
import axios from "../api/axios";

import useAuthContext from "../context/AuthContext";

const forgotpassword = () => {
    const [email, setEmail]= useState("");
    
    const {csrf} = useAuthContext();
    const [errors, setErrors] = useState(null);
    const [status, setStatus] = useState(null);
    
    useEffect(() => {
      
      setErrors([])
    }, [status]);
    
    const data = {email};
    const HandleSubmit = async (event) => {
       
        event.preventDefault()
        await csrf();
        setErrors([]);
        setStatus(null);
        try {
          const response = await axios.post('/api/forgot-password',data);
            
          setEmail("");
          setStatus(response.data.message)
          //setErrors([])
          //navigate("/login");
        } catch (e) {
          if(e.response.status === 422){
            setErrors(e.response.data.errors)

        } else if (e.response.status === 404){
            setErrors(e.response.data.data)
        }

        }
    }
  return (
    <div className="container">
       {status?<><div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span className="font-medium">Success alert!</span> {status}  .
</div></>:<></>}
       
       <form onSubmit={HandleSubmit}>
            <div className="mb-6">
                <label
                htmlFor="email"
                id="email" 
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                Your email
                </label>
                <input
                type="email"
                id="email" onChange={(e)=>setEmail(e.target.value)} value={email} name='email'
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
                required=""
                />
              
            </div>
            
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
        </form>

      </div>
    );
  }

export default forgotpassword