import { AuthProvider } from '../contexts/auth';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return(
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  ); 
}