import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import AnimationData from '../../../public/animations/paperplane-animation.json';
import Aside from '../../components/Aside';
import Header from '../../components/Header';
import AuthContext from '../../contexts/auth';
import useAxios from '../../hooks/useAxios';
import Styles from './styles.module.css';

interface UserData{
  user_name: string;
  matter: Array<object>[];
}

const Dashboard: React.FC = () => {
  const {signed,token} = useContext(AuthContext);
  const route = useRouter();
  const [loading,setLoading] = useState(true);
  const [user_data,setUserData] = useState({} as UserData);
  const [animation_state,setAnimationState] = useState({
    isStopped: false, isPaused: false
  });

  const { data, error } = useAxios('/data/matters',{
    headers:{
      authorization: 'Bearer ' + token
    }
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
    if(!signed){
      route.push('/');
    }
    if(data){
      setLoading(false);
      setUserData(data);
    }
  });

  if(loading) return (
    <Lottie options={defaultOptions}
      height= {400}
      width= {400}
      isStopped={animation_state.isStopped}
      isPaused={animation_state.isPaused}
      isClickToPauseDisabled={true}
    />
  );

  console.log(user_data);

  return (
    <>
      {!signed && <></>}
      {signed && <>
        <Header />
        <div className={Styles.container}>
          <div className={Styles.aside}><Aside matters={user_data.matter}/></div>
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