import React, { useState,useEffect,useRef  } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import useAuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Register = () => {
    const [name, setName]= useState("");
    const [email, setEmail]= useState("");
    const [tanggal, setTanggal]= useState("");
    const [password, setPassword]= useState("");
    const [password_confirmation, setPasswordConfirmation]= useState("");
    const {register,errors,setRegis,setErrors} = useAuthContext();
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const captcha = useRef(null)
    useEffect(() => {
        setRegis(null)
        setErrors([])
        
      }, []);

      const data = {name,email,password,password_confirmation,recaptchaValue};
    const HandleRegister = async (event) => {
    
        event.preventDefault()
        register(data);
        captcha.current.reset()
    }
    return (
      <div className="flex flex-col items-center justify-center px-6 pt-5 mx-auto  pt:mt-0 dark:bg-gray-900">
        <a className="flex flex-col items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
          <img src="https://s3.getstickerpack.com/storage/uploads/sticker-pack/genshin-impact-eula/sticker_1.png" className="mr-4 h-11" alt="FlowBite Logo" />
          <span>Sistem Informasi Sarana dan Prasarana</span>  
        </a>
        <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sign up to platform 
          </h2>
          <form className="mt-8 space-y-6" onSubmit={HandleRegister}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
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
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
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
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input
                type="password"
                id="password" onChange={(e)=>setPassword(e.target.value)} value={password} name='password'
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                />
                {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Confirmation</label>
              <input
                 type="password"
                 id="password_confirmation" onChange={(e)=>setPasswordConfirmation(e.target.value)} value={password_confirmation} name='password_confirmation'
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 required=""
                 />
                 {errors.password_confirmation && <span style={{ color: 'red' }}>{errors.password_confirmation}</span>}
            </div>
            <ReCAPTCHA
                ref={captcha}
                sitekey="6Lef-bUaAAAAABFTIzmUc0A3tLulDqIw3EvCERVs"
                onChange={(value) => setRecaptchaValue(value)}
                
            />
            {errors.recaptchaValue && <span style={{ color: 'red' }}>{errors.recaptchaValue}</span>}
            <button
                type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Login to your account
                </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Already Have Account? <Link to="/Login"  className="text-green-500 text-primary-700 hover:underline dark:text-primary-500">Login Here!</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  
export default Register;
  