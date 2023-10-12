import React, { useEffect, useState } from 'react'
import axios from 'axios'
import logo from '../assets/logo.jpg'
export default function NavBar() {
  
  const [isUserLoggedIn , setIsUserLoggedIn] = useState<boolean>(false);
  

  useEffect(()=>{
      const init = async () =>{
        axios.get("http://localhost:3001/auth/user",{headers:{
            authorization:"Bearer" + ' ' + localStorage.getItem("token")
        }}).then((response)=>{
            if(response.data.username){
                setIsUserLoggedIn(true);
            }
            else{
                setIsUserLoggedIn(false);
            }
        })
      }
    
      init();

  },[])

  return (
    <div className='flex justify-between px-3 py-2' >
      <div className='flex justify-start'>
        <img src={logo} alt="logo" className='w-12 h-12 -mt-2'/>
        <h2 className='text-lg text-orange-500 font-semibold'>My Url Shortener</h2>
      </div>
      <div >
         {((!isUserLoggedIn) ? 
         <div className='flex-row '>
            <button className='bg-orange-500 text-white font-semibold px-3 py-2 mr-2'>Signup</button>
            <button className='bg-orange-500 text-white font-semibold px-3 py-2'>Login</button>
         </div>
         :
         <div className='flex-row'>
            <button className='bg-orange-500 text-white font-semibold px-3 py-2'>Logout</button>
         </div>
         )}
      </div>
    </div>
  )
}