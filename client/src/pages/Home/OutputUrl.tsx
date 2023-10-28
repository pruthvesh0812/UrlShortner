import React from 'react'
import { outputUrlStates } from '../../components/store/atoms/outputUrlStates'
import { useRecoilValue, useSetRecoilState } from "recoil"
import { copyState } from '../../components/store/selectors/copySelector';
// import { shortUrlState } from '../../components/store/selectors/shortUrlSelector';
import copy from '../../assets/copy.png'
import { useEffect } from 'react';
import { shortUrlState } from '../../components/store/atoms/shortUrlState';
import { isCopied } from '../../components/store/atoms/isCopied';
import { urlState } from '../../components/store/atoms/urlState';

export default function OutputUrl() {
    const shortUrl = useRecoilValue(shortUrlState);
    const iscopied = useRecoilValue(isCopied)
    const url = useRecoilValue(urlState)
    const setShortUrl = useSetRecoilState(shortUrlState)
    const setIsCopied = useSetRecoilState(isCopied)

    useEffect(() => {
        setShortUrl('')
        setIsCopied(false)
    }, [url])

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setIsCopied(true)
    }

    return (
        <div>
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
                        onClick={() => { handleCopy() }} />

                    {iscopied &&
                        <div>
                            <h1 className='mt-4 font-normal text-lg text-sky-800 absolute right-2 -bottom-9'>url copied!</h1>
                        </div>}
                </div>
            </div>
        </div>
    )
}
