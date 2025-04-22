import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);
  return <Component {...pageProps} />;
}
