import LoadingAnimation from '../../public/animations/LoadingAnimation.json';
import ErrorAnimation from '../../public/animations/ErrorAnimation.json';

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