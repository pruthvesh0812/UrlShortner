import React, { useEffect, useState } from 'react'
import axios from 'axios'
import logo from '../assets/logo.jpg'
import { useNavigate } from 'react-router-dom';
export default function NavBar() {
  
  const [isUserLoggedIn , setIsUserLoggedIn] = useState<boolean>(false);
  const [inAccount, setInAccount] = useState<boolean>(false)
  const [username,setUsername] = useState<string>("")
  const navigate = useNavigate();  

  const init = async () =>{
    axios.get("http://localhost:3001/auth/user",{headers:{
        authorization:"Bearer "  + `${localStorage.getItem("token")}`
    }}).then((response)=>{
        
        if(response.data.username){
            setIsUserLoggedIn(true);
            setUsername(response.data.username)
        }
        else{
            setIsUserLoggedIn(false);
            alert("false token:"+localStorage.getItem("token"))
        }
    })
  }

  useEffect(()=>{

      init();

  },[])

  return (
    <div className='flex justify-between px-3 py-2' >
      <div className='flex justify-start'>
        <img src={logo} alt="logo" className='w-12 h-12 -mt-2'/>
        <h2 className='text-2xl text-orange-500 font-semibold'>My Url Shortenere </h2>
        {
          username.length != 0 && 
            <h2 className='text-2xl text-orange-500 font-semibold'>| Hello {username}</h2>
        }
      </div>
      <div >
         {((!isUserLoggedIn) ? 
         <div className='flex-row '>
            <button className='bg-orange-500 rounded-md text-white font-semibold px-3 py-2 mr-2' 
              onClick={()=>{
                navigate("/signup");
                setIsUserLoggedIn(true)}}
                >Signup</button>
            <button className='bg-orange-500 rounded-md text-white font-semibold px-3 py-2' 
              onClick={()=>{
                navigate("/login")
                setIsUserLoggedIn(true)}}
                >Login</button>
         </div>
         :
         <div className='flex-row'>
          {
            !inAccount && 
                <button className='bg-orange-500 mr-2 rounded-md text-white font-semibold px-3 py-2'
                onClick={()=>{
                  setInAccount(true)
                  navigate("/account");
                  }}>My Account</button>
             ||

                <button className='bg-orange-500 mr-2 rounded-md text-white font-semibold px-3 py-2'
                onClick={()=>{
                  setInAccount(false)
                  navigate("/");
                  }}>Home</button>
          }
           
            <button className='bg-orange-500 rounded-md text-white font-semibold px-3 py-2'
                    onClick={()=>{
                      localStorage.setItem("token",'');
                      setIsUserLoggedIn(false)
                      setUsername('');
                      navigate('/')}
                      }>Logout</button>
         </div>
         )}
      </div>
    </div>
  )
}