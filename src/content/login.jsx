import React, { useState,useEffect,useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import useAuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
const Login = () => {
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const {regis,login,errors,setErrors} = useAuthContext();
    const captcha = useRef(null)
    useEffect(() => {
        console.log("regis updated:", regis);
        setErrors([])
      }, []);
    
    
    const data = {email, password,recaptchaValue,loginAttempts};
    const HandleLogin = async (event) => {
       
        event.preventDefault()
            login( data );
            setLoginAttempts(loginAttempts + 1);
            captcha.current.reset()
    }
    return (
      <div className="container">
       {regis?<><div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span className="font-medium">Success alert!</span> {regis} Berhasil Mendaftar, Silahkan Login .
</div></>:<></>}
       
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
            <div>
            {loginAttempts >= 3 && (
                <>
                <ReCAPTCHA
                ref={captcha}
                sitekey="6Lef-bUaAAAAABFTIzmUc0A3tLulDqIw3EvCERVs"
                onChange={(value) => setRecaptchaValue(value)}
                
            />
                </>
            
            )}
            {/* Komponen login Anda di sini */}
            {errors.recaptchaValue && <span style={{ color: 'red' }}>{errors.recaptchaValue}</span>}
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
                <Link to="/Forgotpassword"   className="ms-2 text-sm font-medium text-blue-900 dark:text-blue-300" aria-current="page">Forgot-Password</Link>
            </div>
                
                <button
                
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Forgot Password
                </button>
        </form>

      </div>
    );
  }
  
  
export default Login;
  