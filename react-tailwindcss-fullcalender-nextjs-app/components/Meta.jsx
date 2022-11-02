import Head from 'next/head';

const Meta = ({
  title = `Welcome to tokimeki lion site`,
  description = `this is tokimeki lion site`,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="initial-scale=1, width=device-width, maximum-scale=1.0"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Meta;
