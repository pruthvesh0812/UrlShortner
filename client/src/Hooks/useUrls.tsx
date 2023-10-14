import { useState , useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

interface Url {
    shortUrl:string;
    originUrl:string;
  }

type AllUrl = Url[];

export const useUrls = ()=>{

    const [allUrls , setAllUrls] = useState<AllUrl>([{shortUrl:'',originUrl:''}])

    const getUrls = async ()=>{
      const response = await axios.get("http://localhost:3001/myUrl/allUrl",{headers:{
        authorization:"Bearer " + `${localStorage.getItem("token")}`
       }});
  
       setAllUrls(response.data.allUrlsArray);
     }

     useEffect(()=>{
        getUrls();
     },[])

      return allUrls;
}
