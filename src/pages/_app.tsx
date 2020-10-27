import { AuthProvider } from '../contexts/auth';
import GlobalStyle from '../styles/globals';

export default function MyApp({ Component, pageProps }) {
  return(
    <AuthProvider>
      <Component {...pageProps} />
      <GlobalStyle />
    </AuthProvider>
  ); 
}