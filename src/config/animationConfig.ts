import LoadingAnimation from '../assets/animations/LoadingAnimation.json';
import ErrorAnimation from '../assets/animations/ErrorAnimation.json';

export const defaultLoadingOptions = {
  loop: true,
  autoplay: true, 
  animationData: LoadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export const defaultErrorOptions = {
  loop: true,
  autoplay: true, 
  animationData: ErrorAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};