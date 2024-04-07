import React from 'react';
import { AppProps } from 'next/app';
import RootLayout from './layout';

function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
        <Component {...pageProps} />
    </RootLayout>
  );
}

export default App;
