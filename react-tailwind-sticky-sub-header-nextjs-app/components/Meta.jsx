import Head from 'next/head';

const Meta = ({
  title = `Welcome to make yourself`,
  description = `this is make yourself site`,
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
