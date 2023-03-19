import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import Layout from '@/components/Layout';
import CssBaseline from '@mui/material/CssBaseline';


export default function App({ Component, pageProps }: AppProps) {
  return (
     
      <Layout>
        <CssBaseline>
        <Component {...pageProps} />
        </CssBaseline>
      </Layout>
      
  
  );
}
