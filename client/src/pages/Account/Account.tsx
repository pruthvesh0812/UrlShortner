import { useUrls } from '../../Hooks/useUrls'
import UrlCard from '../../components/ui/UrlCard';
import loading from '../../assets/loading.png'


interface Url {
  shortUrl:string;
  originUrl:string;
  
}

interface message{
  message:string;
}

type AllUrl = Url[];

export default function Account() {
    
  const urls:AllUrl | string = useUrls();
  
  if(typeof(urls) == 'string'){
    return (
      <div>sdfsdfsdf
        <h1 className=' font-medium text-xl text-orange-400 my-4'>{urls}</h1>   
      </div>
    )
  }

  if(urls.length  == 1 && urls[0].shortUrl == ''){
    return (
      <div className='flex justify-center'>
            <img src={loading} alt='' className='animate-spin w-10 h-10 mt-8'/>      
      </div>
    )
  }
  else{
    return (
      <div className='flex justify-center'>
        <div >
         { urls.map((url,index)=>{
              return (<UrlCard key={index} shortUrl={url.shortUrl} originUrl={url.originUrl} />);
          })}
        </div>
      </div>
    )
  }
 
}
