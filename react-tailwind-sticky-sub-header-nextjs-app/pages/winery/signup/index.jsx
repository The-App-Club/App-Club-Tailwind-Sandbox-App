import {css, cx} from '@emotion/css';
import Layout from '@/layouts/default';
import Link from 'next/link';

const SignUp = () => {
  return (
    <Layout>
      <section className={cx(`mt-12 px-2 pb-2`)}>
        <h2>Sign Up</h2>
        <Link href={`/winery/signin`}>
          <a className="hover:underline">Sign In</a>
        </Link>
      </section>
    </Layout>
  );
};

export default SignUp;
