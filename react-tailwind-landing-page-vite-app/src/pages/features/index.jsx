import {Spacer} from '../../components/Spacer';
import {css, cx} from '@emotion/css';
import {default as Layout} from '../../layouts/default';

import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect} from 'react';
import {BiBookContent} from 'react-icons/bi';
import {MdPhoneIphone} from 'react-icons/md';
import {GrMoney} from 'react-icons/gr';

const FeaturesPage = ({pageName, notifier}) => {
  useEffect(() => {
    // https://github.com/michalsnik/aos#predefined-options
    AOS.init({
      once: true,
      easing: 'ease-out-sine',
      duration: 600,
    });
  }, []);

  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section className={cx(css``, `max-w-2xl mx-auto w-full relative p-2`)}>
        <div
          className={cx(
            css``,
            `pt-8 flex justify-center items-center flex-col gap-2`
          )}
        >
          <h2 className="text-3xl pb-3">FeaturesPage</h2>
          <div data-aos="fade-right" className="max-w-md">
            <h3 className="text-xl">Simple content management</h3>
            <p>
              Nor again is there anyone who loves or pursues or desires to
              obtain pain of itself.
            </p>
          </div>
          <div data-aos="fade-up">
            <BiBookContent size={128} />
          </div>

          <div data-aos="fade-left" className="max-w-md">
            <h3 className="text-xl">Multi-platform Support</h3>
            <p>
              Obligations of business it will frequently occur that pleasures
              have to be repudiated and annoyances accepted.
            </p>
          </div>
          <div data-aos="fade-up">
            <MdPhoneIphone size={128} />
          </div>

          <div data-aos="fade-left" className="max-w-md">
            <h3 className="text-xl">Monetization</h3>
            <p>Et harum quidem rerum facilis est et expedita distinctio.</p>
          </div>
          <div data-aos="fade-up">
            <GrMoney size={128} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export {FeaturesPage};
