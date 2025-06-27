import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>FLAVOURPRINTLAB - Innovative Beverage Technology</title>
        <meta
          name="description"
          content="FLAVOURPRINTLAB - Revolutionizing the beverage industry with innovative technology and unique flavor experiences."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
