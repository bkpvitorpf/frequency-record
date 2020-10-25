import GlobalStyle from '../styles/globals';
import {AuthProvider} from '../contexts/auth';

export default function MyApp({ Component, pageProps }) {
  return(
    <AuthProvider>
      <Component {...pageProps} />
      <GlobalStyle />
    </AuthProvider>
  ); 
}