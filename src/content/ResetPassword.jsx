import React, { useState,useEffect,useRef } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie"
import useAuthContext from "../context/AuthContext";

const ResetPassword = () => {
    const [current_password, setCurrent_password]= useState("");
    const [new_password, setNew_password]= useState("");
    const [new_confirm_password, setNew_confirm_password]= useState("");
    
    const {csrf} = useAuthContext();
    const [errors, setErrors] = useState(null);
    const [status, setStatus] = useState(null);
    
    useEffect(() => {
      
      setErrors([])
    }, [status]);
    
    const data = {current_password,new_password,new_confirm_password};
    const HandleSubmit = async (event) => {
       
        event.preventDefault()
        await csrf();
        setErrors([]);
        setStatus(null);
        try {
        const token = Cookies.get('tokenku')
          const response = await axios.post('/api/reset-password',data,{ headers: {"Authorization" : `Bearer ${token}`} });
            
          setCurrent_password("");
          setNew_password("");
          setNew_confirm_password("");
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
                htmlFor="password"
                id="email" 
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                Password Sekarang
                </label>
                <input
                type="password"
                id="current_password" onChange={(e)=>setCurrent_password(e.target.value)} value={current_password} name='current_password'
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                required=""
                />
              
            </div>
            <div className="mb-6">
                <label
                htmlFor="email"
                id="email" 
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                Password Baru
                </label>
                <input
                type="password"
                id="new_password" onChange={(e)=>setNew_password(e.target.value)} value={new_password} name='new_password'
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                required=""
                />
              
            </div>
            <div className="mb-6">
                <label
                htmlFor="email"
                id="email" 
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                Konfirmasi Password
                </label>
                <input
                type="password"
                id="new_confirm_password" onChange={(e)=>setNew_confirm_password(e.target.value)} value={new_confirm_password} name='new_confirm_password'
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

export default ResetPassword