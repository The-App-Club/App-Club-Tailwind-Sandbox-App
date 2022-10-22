import {cx} from '@emotion/css';
import Link from 'next/link';

import Layout from '@/layouts/default';

const SignIn = () => {
  return (
    <Layout>
      <section className={cx(`mt-12 px-2 pb-2`)}>
        <h2>Sign In</h2>
        <Link href={`/user/signup`}>
          <a className="hover:underline">User Sign Up</a>
        </Link>
      </section>
    </Layout>
  );
};

export default SignIn;
