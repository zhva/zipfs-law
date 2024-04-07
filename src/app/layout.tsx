import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import {DataProvider} from '@/app/utils/DataContext';

export const metadata: Metadata = {
  title: "Zipf's Law in Songs",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <Head>
            <title>{metadata.title as string}</title>
            <meta name="description" content={metadata.description as string} />
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
      <body>
        <main>
            <DataProvider>
                {children}
            </DataProvider>
        </main>
      </body>
    </html>
  );
}
