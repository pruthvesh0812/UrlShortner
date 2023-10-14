import React from 'react'
import copy from '../../assets/copy.png';

type AllUrl = {
    shortUrl:string;
    originUrl:string;
}

export default function UrlCard({shortUrl,originUrl}:AllUrl) {

  return (
    <div className='flex-col w-[800px] mb-6'>
      <div className='drop-shadow-md bg-white py-5 px-3 relative'>
        <h1 className=' font-medium text-xl text-orange-400'>{shortUrl}</h1>   
        <img src={copy} 
                alt='copy url' 
                className='w-10 h-10 absolute right-1 top-3 hover:drop-shadow-sm cursor-pointer'
                onClick={()=>{navigator.clipboard.writeText(shortUrl)}} />                
        <hr className=' bg-slate-900 mt-4'></hr>
        <div className=' pt-4 -mb-1  bg-white rounded '>
          <h1 className='line-clamp-3 font-normal text-lg text-slate-600 '>{originUrl}</h1>                   
        </div>
      </div>
      
    </div>
  )
}
