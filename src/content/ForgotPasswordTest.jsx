import React, { useState,useEffect,useRef } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col items-center justify-center px-6 mx-auto  pt:mt-0 dark:bg-gray-900">
        <a className="flex flex-col items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
          <img src="https://s3.getstickerpack.com/storage/uploads/sticker-pack/genshin-impact-eula/sticker_1.png" className="mr-4 h-11" alt="FlowBite Logo" />
          <span>Sistem Informasi Sarana dan Prasarana</span>  
        </a>
        {status?<><div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span className="font-medium">Success alert!</span> {status}  .
</div></>:<></>}
        <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Forgot Password
          </h2>
          <form className="mt-8 space-y-6" onSubmit={HandleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
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
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Send Reset Link
                </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Not Forgot your password? <Link to="/Login"  className="text-green-500 text-primary-700 hover:underline dark:text-primary-500">Login Here</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

export default forgotpassword