import React from 'react'
import copy from '../../assets/copy.png';

type AllUrl = {
    shortUrl:string;
    originUrl:string;
}

export default function UrlCard({shortUrl,originUrl}:AllUrl) {
    {console.log(originUrl)}
  return (
    <div className='flex-col w-[50%]'>
      <div className='drop-shadow-md bg-white py-8 px-3 relative'>
        <h1 className=' font-medium text-xl text-orange-400'>{shortUrl}</h1>   
        <img src={copy} 
                alt='copy url' 
                className='w-10 h-10 absolute right-1 top-3 hover:drop-shadow-sm cursor-pointer'
                onClick={()=>{navigator.clipboard.writeText(shortUrl)}} />                
      </div>
      <div className='px-3 py-4'>
        
        <h1 className='mt-4 font-normal text-lg text-slate-400'>{originUrl}</h1>                   
      </div>
    </div>
  )
}
