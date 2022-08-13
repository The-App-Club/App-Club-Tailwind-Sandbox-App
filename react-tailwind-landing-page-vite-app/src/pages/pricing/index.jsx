import {Spacer} from '../../components/Spacer';
import {css, cx} from '@emotion/css';
import {default as Layout} from '../../layouts/default';
import {Layout as PopUp} from '../../layouts/popup';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {PricingYearly} from '../../components/PricingYearly';
import {PricingMonthly} from '../../components/PricingMonthly';
import {useMemo, useState} from 'react';

const PricingPage = ({pageName, notifier}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section className={cx(css``, `max-w-2xl mx-auto w-full relative p-2`)}>
        <div
          className={cx(
            css`
              @media (max-width: 1400px) {
                padding-bottom: 12rem;
              }
              @media (max-width: 768px) {
                padding-bottom: 3rem;
              }
            `,
            `pt-8 flex justify-center items-center flex-col`
          )}
        >
          <Tabs
            className={cx(css``)}
            onSelect={(e) => {
              setActiveIndex(e);
            }}
          >
            <TabList
              className={cx(
                css`
                  border-bottom: 1px solid #aaa;
                `,
                `flex justify-center items-center`
              )}
            >
              <Tab>Monthly</Tab>
              <Tab>Yearly</Tab>
            </TabList>
            <Spacer />

            <TabPanel
              className={cx(css``, `flex justify-center items-center flex-col`)}
            >
              <PopUp>
                <PricingMonthly />
              </PopUp>
            </TabPanel>
            <TabPanel
              className={cx(css``, `flex justify-center items-center flex-col`)}
            >
              <PopUp>
                <PricingYearly />
              </PopUp>
            </TabPanel>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export {PricingPage};
