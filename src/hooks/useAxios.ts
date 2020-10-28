import { AxiosRequestConfig } from 'axios';
import useSWR from 'swr';
import Api from '../services/api';

const useAxios = (url,{...args}:AxiosRequestConfig) => {
  const {data,error} = useSWR(url,async url=>{
    const response = await Api.get(url,{...args});
    return response.data;
  },{
    errorRetryInterval: 5,
    revalidateOnReconnect: true
  })
  
  return {data,error}
}

export default useAxios;