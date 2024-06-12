import Head from "next/head";
import { FC } from "react";

const MetaData: FC = () => {
  return (
    <Head>
      <title>Speed dating</title>
      <meta name="description" content="Meet new people." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default MetaData;
