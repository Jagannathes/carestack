import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import Landing from '@/components/landing';


// Note: The subsets need to use single quotes because the font loader values must be explicitly written literal.
// eslint-disable-next-line @typescript-eslint/quotes


export default function Home() {
  return (
    <>
      <Head>
        <title>Hermes Social Network</title>
        <meta
          name="Hermes Social Network"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
    </>
  );
}
