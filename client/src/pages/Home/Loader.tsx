import React from 'react'
import { isLoading } from '../../components/store/atoms/isLoading'
import {useRecoilValue} from "recoil"
import loading from '../../assets/loading.png'

export default function Loader() {
    const isloading = useRecoilValue(isLoading)
  return (
    <div> 
       <div className='flex justify-center'>
        { 
          isloading &&
          <div>
            
            <img src={loading} alt='' className='animate-spin w-10 h-10 mt-8'/>      
          </div>
        }
      </div>
    </div>
  )
}
