import { useState , useEffect } from "react";
import axios, { all } from "axios";
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
  
       
       response.data.allUrlsArray.forEach((url:Url,index:number)=>{
            // this can be empty from backend can send anything in res.json
         if(response.data.originUrls[index]){
           url.originUrl=response.data.originUrls[index].origin;
         }
        });

       setAllUrls(response.data.allUrlsArray);
      
     }  

     useEffect(()=>{
        getUrls();
     },[])
      
     if(allUrls.length >= 1){
      const reverseUrlArr:Url[] = [...allUrls]  // copies elements of allUrls to reverseUrlArr in one line of code
      return reverseUrlArr.reverse()
     }
     else{
      return "No Urls Found";
     }
}
