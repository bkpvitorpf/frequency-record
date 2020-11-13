import LoadingScreen from '../assets/animations/LoadingAnimation.json';
import ErrorScreen from '../assets/animations/ErrorAnimation.json';
import LoadingAnimation from '../assets/animations/LoadingDataAnimation.json';

export const defaultLoadingOptions = {
  loop: true,
  autoplay: true, 
  animationData: LoadingScreen,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export const defaultErrorOptions = {
  loop: true,
  autoplay: true, 
  animationData: ErrorScreen,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export const defaultLoadingAnimationOptions ={
  loop: true,
  autoplay: true, 
  animationData: LoadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}