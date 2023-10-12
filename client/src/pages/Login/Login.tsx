import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Login() {

   const [username,setUsername] = useState<string>('');
   const [password,setPassword] = useState<string>('');

  const handleLogin = ()=>{
    // axios.post("")
  }


  return (
    <div className='flex justify-center'>
      <div className='w-[400px] px-10 py-16 mt-16 border rounded-md bg-amber-100'>
        <div className='my-4'>
            <label>Username</label>
            <input 
                type='text' 
                placeholder='eg. Pruthvesh'
                value={username}
                onChange={(e)=>{
                    setUsername(e.target.value)
                }}
                />
        </div>
        <div className='my-4'>
            <label>Password</label>
            <input 
                type='password'
                placeholder='********'
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                />
        </div>

        <div className='flex justify-center mt-10'>
            <div className='flex-col '>
                <div className='flex justify-center'>
                <button className='bg-orange-500 text-white font-semibold px-2 w-[120px] py-2 mt-2 rounded-sm'
                        onClick={()=>{handleLogin()}}>Login</button>
                </div>
                <Link to='/Signup'><h3 className='text-purple-900  mt-4 text-base'>New Here? Signup</h3></Link>               
            </div>
        </div>
      </div>
    </div>
  )
}
