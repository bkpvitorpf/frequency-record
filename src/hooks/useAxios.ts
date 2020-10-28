import useSWR from 'swr';
import Api from '../services/api';

const useAxios = (url:string) => {
  const {data,error} = useSWR(url,async (url:string) =>{
    const response = await Api.get(url);
    return response.data;
  },{
    errorRetryInterval: 20,
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  })
  
  return {data,error}
}

export default useAxios;