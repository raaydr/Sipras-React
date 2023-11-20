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
            Change Password
          </h2>
          <form className="mt-8 space-y-6" onSubmit={HandleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Lama</label>
              <input
                type="password"
                id="current_password" onChange={(e)=>setCurrent_password(e.target.value)} value={current_password} name='current_password'
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                required=""
                />
              
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Baru</label>
              <input
                type="password"
                id="new_password" onChange={(e)=>setNew_password(e.target.value)} value={new_password} name='new_password'
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                required=""
                />
                
                
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Baru Konfirmasi</label>
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
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Change Password
                </button>
          </form>
        </div>
      </div>
    );
  }

export default ResetPassword