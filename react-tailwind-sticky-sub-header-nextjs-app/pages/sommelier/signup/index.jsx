import {cx} from '@emotion/css';
import Link from 'next/link';

import Layout from '@/layouts/default';

const SignUp = () => {
  return (
    <Layout>
      <section className={cx(`mt-12 px-2 pb-2`)}>
        <h2>Sign Up</h2>
        <Link href={`/sommelier/signin`}>
          <a className="hover:underline">Sommelier Sign In</a>
        </Link>
      </section>
    </Layout>
  );
};

export default SignUp;
