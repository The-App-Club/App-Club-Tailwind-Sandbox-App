import {Spacer} from '../../components/Spacer';
import {css, cx} from '@emotion/css';
import {default as Layout} from '../../layouts/default';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect} from 'react';
const QuestionPage = ({pageName, notifier}) => {
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
        <h2 className="text-3xl pb-2 flex justify-center items-center">
          QuestionPage
        </h2>
        <div
          className={cx(
            css``,
            `pt-8 flex justify-center items-center flex-col gap-12`
          )}
        >
          <div>
            <div className="max-w-md flex justify-center items-center flex-col">
              <h3 className="text-xl" data-aos="fade-right">
                Is it available to everyone?
              </h3>
              <p data-aos="fade-left">
                Anyone can use this service. This service is also available to
                artists who are not affiliated with a record company or office.
              </p>
            </div>
          </div>
          <div>
            <div className="max-w-md flex justify-center items-center flex-col">
              <h3 className="text-xl" data-aos="fade-right">
                How much does it cost?
              </h3>
              <p data-aos="fade-left">The annual membership fee is $79.</p>
            </div>
          </div>

          <div>
            <div className="max-w-md flex justify-center items-center flex-col">
              <h3 className="text-xl" data-aos="fade-right">
                a commission fee?
              </h3>
              <p data-aos="fade-left">
                A 30% commission is charged on subscription sales.if users are
                billed through Apple pay, an additional 30% commission is
                charged on subscription sales.
              </p>
            </div>
          </div>

          <div>
            <div className="max-w-md flex justify-center items-center flex-col">
              <h3 className="text-xl" data-aos="fade-right">
                a cancellation fee when I quit?
              </h3>
              <p data-aos="fade-left">No match.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export {QuestionPage};
