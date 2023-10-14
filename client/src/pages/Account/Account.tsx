
import { useUrls } from '../../Hooks/useUrls'
import UrlCard from '../../components/ui/UrlCard';

interface Url {
  shortUrl:string;
  originUrl:string;
}

type AllUrl = Url[];

export default function Account() {
    
  const urls:AllUrl = useUrls();
  
  console.log(urls)
  return (
    <div>
      <div className='flex justify-center'>
       { urls.map((url,index)=>{
            return (<UrlCard key={index} shortUrl={url.shortUrl} originUrl={url.originUrl} />);
        })}
      </div>
    </div>
  )
}
