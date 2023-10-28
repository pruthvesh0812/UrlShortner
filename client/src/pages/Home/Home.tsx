import axios from 'axios'
import React, { useEffect, useState } from 'react'
import InputUrl from './InputUrl'
import Loader from './Loader'
import OutputUrl from './OutputUrl'



export default function Home() {

  const [url,setUrl] = useState<string>("")
  const [shortUrl,setShortUrl] = useState<string>("");
  const [iscopied,setIsCopied] = useState<boolean>(false);
  const [isloading,setISLoading] = useState<boolean>(false)

  console.log(isloading,shortUrl.length)

  

  



  return (
    <div>
      <InputUrl />
      <Loader />
      <OutputUrl />  
    </div>
  )
}
