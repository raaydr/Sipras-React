import React, { useState } from "react";
import useAuthContext from "../context/AuthContext";

const Login = () => {
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    
    const {login,errors} = useAuthContext();
    const data = {email, password};
    const HandleLogin = async (event) => {
        event.preventDefault()
        login({ email,password });
    }
    return (
      <div className="container">
       
       <form onSubmit={HandleLogin}>
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
                {errors.error && <span style={{ color: 'red' }}>{errors.error}</span>}
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
            <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                <input
                    id="remember"
                    type="checkbox"
                    defaultValue=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required=""
                />
                </div>
                <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                Remember me
                </label>
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
  
  
export default Login;
  