import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../config'
import copy from '../../assets/copy.png'
import loading from '../../assets/loading.png'
import {z} from 'zod'

const urlValid = z.union([z.literal(""), z.string().trim().url()]);

export default function Home() {

  const [url,setUrl] = useState<string>("")
  const [shortUrl,setShortUrl] = useState<string>("");
  const [iscopied,setIsCopied] = useState<boolean>(false);
  const [isloading,setISLoading] = useState<boolean>(false)

  console.log(isloading,shortUrl.length)

  const handleShorten = async ()=>{
    setISLoading(true)
    const parseUrl = urlValid.safeParse(url);
    if(parseUrl.success){
      try{

        const resUrl= await axios.post(`${BASE_URL}/myUrl/shorten`,{originUrl:url},{
          headers:{authorization: "Bearer " + `${localStorage.getItem("token")}`}
          }).then(res=>res.data);

        setShortUrl(resUrl.shortened);
        
      }
      catch(err){
        setUrl('ERROR: Invalid Url');
      }

    }else{
      setUrl('ERROR: Not A Url');
    }

    setISLoading(false); 
  }

  const handleCopy = ()=>{
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
  }

  useEffect(()=>{
    setShortUrl('')
    setIsCopied(false)
  },[url])

  return (
    <div>
      <div className='mt-[100px] flex justify-center'>
          <h1 className='text-3xl font-mono font-semibold text-orange-600'>Enter URL Below</h1>
        </div>
      <div className='flex justify-center mt-[20px]'>
        
        <input 
          type="text"
          className='h-16 drop-shadow-md rounded-md px-3 w-[50%] border-2 border-orange-500 bg-[#fdfcf0] focus:outline-none focus:border-orange-500 '
          value={url}
          placeholder='Enter Url Here'
          onChange={(e)=>{setUrl(e.target.value)}}
          />

        <button onClick={()=>{handleShorten()}} className='bg-orange-500 rounded-md text-white mx-6 p-4'>Shorten Url</button>
      </div>

      <div className='flex justify-center'>
        { 
          isloading &&
          <div>
            
            <img src={loading} alt='' className='animate-spin w-10 h-10 mt-8'/>      
          </div>
        }
      </div>

      <div className='flex justify-center'>
        
      {/* <h1 className='mt-4 font-medium text-xl'>Shortened URL</h1> */}
        <div className='flex justify-start mt-8 relative h-16 drop-shadow-md rounded-md px-3 w-[50%] border-2 border-orange-500'>
          {shortUrl.length != 0 && 
          <div>
            <h1 className='mt-4 font-medium text-xl'>{shortUrl}</h1>            
          </div> ||
          <div>
            <h1 className='mt-4 font-normal text-lg text-slate-400'>Shortened Url</h1>            
          </div>
          }
          
          <img src={copy} 
                alt='copy url' 
                className='w-10 h-10 absolute right-1 top-3 hover:drop-shadow-sm cursor-pointer'
                onClick={()=>{handleCopy()}} />

          {iscopied && 
          <div>
            <h1 className='mt-4 font-normal text-lg text-sky-800 absolute right-2 -bottom-9'>url copied!</h1>            
          </div>}
        </div> 
      </div>
    </div>
  )
}
