import React, { useState,useEffect } from "react";
import useAuthContext from "../context/AuthContext";
const Register = () => {
    const [name, setName]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [password_confirmation, setPasswordConfirmation]= useState("");
    
    const {register,errors,setRegis} = useAuthContext();
    setRegis(null)
    useEffect(() => {
        setRegis(null)
        
        
      }, []);

      
    const HandleRegister = async (event) => {
    
        event.preventDefault()
        register({name,email,password,password_confirmation});
        
    }
    return (
        <div className="container">
       
        <form onSubmit={HandleRegister}>
             <div className="mb-6">
                 <label
                 htmlFor="email"
                 id="email" 
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                 >
                 Your Name
                 </label>
                 <input
                 type="text"
                 id="name" onChange={(e)=>setName(e.target.value)} value={name} name='name'
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="name@flowbite.com"
                 required=""
                 />
                 {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                {errors.error && <span style={{ color: 'red' }}>{errors.error}</span>}
             </div>
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
                 {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
             </div>
             <div className="mb-6">
                 <label
                 htmlFor="password" 
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                 >
                 Your password
                 </label>
                 <input
                 type="password"
                 id="password" onChange={(e)=>setPassword(e.target.value)} value={password} name='password'
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 required=""
                 />
                 {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
             </div>
             <div className="mb-6">
                 <label
                 htmlFor="password" 
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                 >
                 password confirm
                 </label>
                 <input
                 type="password"
                 id="password_confirmation" onChange={(e)=>setPasswordConfirmation(e.target.value)} value={password_confirmation} name='password_confirmation'
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 required=""
                 />
                 {errors.password_confirmation && <span style={{ color: 'red' }}>{errors.password_confirmation}</span>}
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
  
  
export default Register;
  