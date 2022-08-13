import {css, cx} from '@emotion/css';
import {default as Layout} from '../../layouts/default';
import {ArtistsPage} from '../artists';
import {FeaturesPage} from '../features';
import {PricingPage} from '../pricing';
import {QuestionPage} from '../question';
import {ServicePage} from '../service';
const HomePage = ({pageName, notifier}) => {
  return (
    <>
      <Layout pageName={pageName} notifier={notifier}>
        <section className={cx(css``, `max-w-2xl mx-auto w-full relative`)}>
          <div
            className={cx(
              css``,
              `pt-8 flex justify-center items-center flex-col`
            )}
          >
            <h2 className="text-3xl">HomePage</h2>
            <p>something...</p>
            <p>something...</p>
            <p>something...</p>
          </div>
        </section>
      </Layout>
      <ServicePage pageName={pageName} notifier={notifier} />
      <FeaturesPage pageName={pageName} notifier={notifier} />
      <ArtistsPage pageName={pageName} notifier={notifier} />
      <PricingPage pageName={pageName} notifier={notifier} />
      <QuestionPage pageName={pageName} notifier={notifier} />
    </>
  );
};

export {HomePage};
