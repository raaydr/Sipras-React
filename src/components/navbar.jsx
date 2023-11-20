import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const main = () => {
  const {user,getUser} = useAuthContext();
  return (
    <div>
      {!user?"":<Navbar/>}
    </div>
  );
}



const Navbar = () =>{
  const {user,getUser,logout} = useAuthContext();
  useEffect(() => {
    getUser();
  }, []);

    return (
  <nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="/"  className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://static.wikia.nocookie.net/gensin-impact/images/d/d7/Icon_Emoji_Paimon's_Paintings_06_Eula_1.png" className="h-8" alt="React JS" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">React JS</span>
    </Link>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
            <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</Link>
        </li>
        {user?
        <> 
          
          <li>
            <Link to="/Welcome" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">User</Link>
          </li>
          <li>
        <Link to="/Reset-Password"  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Reset Password</Link>
        </li>
          <li>
            <Link onClick={logout}   className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Logout</Link>
          </li>
        </>:<><li>
        <Link to="/Login"  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Login</Link>
        </li>
        <li>
        <Link to="/Register"className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Register</Link>
        </li></>}
       
        
      </ul>
    </div>
  </div>
</nav>

    )
}

export default main;