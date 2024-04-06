import React from 'react';
import { AppProps } from 'next/app';
import { DataProvider } from './utils/DataContext';
import RootLayout from './layout';

function App({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </DataProvider>
  );
}

export default App;
