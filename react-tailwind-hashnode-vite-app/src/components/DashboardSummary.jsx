import {css, cx} from '@emotion/css';
import {useMemo} from 'react';
import {DashboardSummaryCard} from './DashboardSummaryCard';
import useSWR from 'swr';
import {GiSpaceship} from 'react-icons/gi';
import {MdToday} from 'react-icons/md';
import {SiFampay} from 'react-icons/si';
import {FaHandshake} from 'react-icons/fa';

const DashboardSummary = () => {
  const {data: totalShips, error: totalShipsError} = useSWR(
    'https://api.countapi.xyz/hit/hoge/fuga',
    async (url) => {
      try {
        const response = await fetch(url);
        const {value: data} = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    }
  );

  const {data: revenuDayRatio, error: revenuDayRatioError} = useSWR(
    'https://api.countapi.xyz/hit/hoge/fuga',
    async (url) => {
      try {
        const response = await fetch(url);
        const {value: data} = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    }
  );

  const {data: totalOrdersToday, error: totalOrdersTodayError} = useSWR(
    'https://api.countapi.xyz/hit/hoge/fuga',
    async (url) => {
      try {
        const response = await fetch(url);
        const {value: data} = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    }
  );
  const {data: totalClientsToday, error: totalClientsTodayError} = useSWR(
    'https://api.countapi.xyz/hit/hoge/fuga',
    async (url) => {
      try {
        const response = await fetch(url);
        const {value: data} = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    }
  );

  const data = useMemo(() => {
    return [
      {
        title: `Total Ships`,
        icon: () => {
          return <GiSpaceship size={48} />;
        },
        percent: 60,
        count: totalShips,
        delta: 30,
      },
      {
        title: `Revenu Day Ratio`,
        icon: () => {
          return <MdToday size={48} />;
        },
        percent: 88,
        count: revenuDayRatio - 10,
        delta: -60,
      },
      {
        title: `Total Orders Today`,
        icon: () => {
          return <SiFampay size={48} />;
        },
        percent: 62,
        count: totalOrdersToday - 20,
        delta: 30,
      },
      {
        title: `Total Clients Today`,
        icon: () => {
          return <FaHandshake size={48} />;
        },
        percent: 2,
        count: totalClientsToday - 33,
        delta: 160,
      },
    ];
  }, [totalShips, revenuDayRatio, totalOrdersToday, totalClientsToday]);

  return (
    <div
      className={cx(
        css`
          display: flex;
          justify-content: center;
          align-items: center;
          @media (max-width: 1300px) {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }
          @media (max-width: 650px) {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
          }
        `,
        'gap-2'
      )}
    >
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className={css`
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
            `}
          >
            <DashboardSummaryCard
              key={index}
              icon={item.icon}
              summaryTitle={item.title}
              percent={item.percent}
              count={item.count}
              delta={item.delta}
            />
          </div>
        );
      })}
    </div>
  );
};

export {DashboardSummary};
