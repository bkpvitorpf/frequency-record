import React,{useContext, useEffect, useState} from 'react';
import Lottie from 'react-lottie';
import AnimationData from '../../../public/animations/paperplane-animation.json';
import AuthContext from '../../contexts/auth';
import Api from '../../services/api';
import Aside from '../../components/Aside';
import Header from '../../components/Header';
import Styles from './styles.module.css';
import {useRouter} from 'next/router';

interface UserData{
  user_name: string;
  matters: Array<object>;
}

const Dashboard: React.FC = () => {
  const {signed,token} = useContext(AuthContext);
  const route = useRouter();
  const [loading,setLoading] = useState(true);
  const [user_data,setUserData] = useState({} as UserData);
  const [animation_state,setAnimationState] = useState({
    isStopped: false, isPaused: false
  });

  // Configurações da animação
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: AnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() =>{
    async function fetchData(){
      const response = await Api.get('/data/matters',{
        headers:{
          authorization: 'Bearer ' + token
        }
      });

      console.log(response.data.matter);
  
      if(response){
        setLoading(false);
        setUserData(response.data)
      }
    }

    if(!signed){
      route.push('/');
    }

    fetchData();
  },[]);

  if(loading) return (
    <Lottie options={defaultOptions}
      height= {400}
      width= {400}
      isStopped={animation_state.isStopped}
      isPaused={animation_state.isPaused}
    />
  );

  return (
    <>
      {!signed && <></>}
      {signed && <>
        <Header />
        <div className={Styles.container}>
          <div className={Styles.aside}><Aside matters={user_data.matters}/></div>
          <div className={Styles.content}>
            <h1>Olá</h1>
            <h1>{user_data.user_name}</h1>
            <h1>Preencha o formulário para continuar</h1>
          </div>
        </div>
      </>}
    </>
  );
}

export default Dashboard;