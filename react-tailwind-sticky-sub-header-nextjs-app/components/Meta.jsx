import Head from 'next/head';

const Meta = ({
  title = `Welcome to cowboy bebop`,
  description = `this is cowboy bebop site`,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Meta;
