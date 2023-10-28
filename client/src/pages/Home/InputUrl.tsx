import React from 'react'
import { useSetRecoilState, useRecoilValue } from "recoil"
import { isLoading } from '../../components/store/atoms/isLoading'
import { z } from 'zod'
import axios from 'axios'
import { BASE_URL } from '../../config'
// import { shortUrlState } from '../../components/store/selectors/shortUrlSelector'
import { shortUrlState } from '../../components/store/atoms/shortUrlState'
import { urlState } from '../../components/store/atoms/urlState'
const urlValid = z.union([z.literal(""), z.string().trim().url().min(1)]);

export default function InputUrl() {

    const url = useRecoilValue(urlState)
    const setISLoading = useSetRecoilState(isLoading)
    const setShortUrl = useSetRecoilState(shortUrlState)
    const setUrl = useSetRecoilState(urlState)

    const handleShorten = async () => {
        setISLoading(true)
        const parseUrl = urlValid.safeParse(url);
        if (parseUrl.success) {
            try {
                const resUrl = await axios.post(`${BASE_URL}/myUrl/shorten`, { originUrl: url }, {
                     headers: { authorization: "Bearer " + `${localStorage.getItem("token")}` }
                }).then(res => res.data);
                // setShortUrl(resUrl.shortened);
                setShortUrl(resUrl.shortened)
            }
            catch (err) {
                setUrl('ERROR: Invalid Url');
            }
        } else {
            setUrl('ERROR: Not A Url');
        }
        setISLoading(false)
    }

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
                    onChange={(e) => { setUrl(e.target.value) }}
                />

                <button onClick={() => { handleShorten() }} className='bg-orange-500 rounded-md text-white mx-6 p-4'>Shorten Url</button>
            </div>

        </div>
    )
}
