import {css, cx} from '@emotion/css';
import {useMemo, useState} from 'react';
import {FiMoreHorizontal} from 'react-icons/fi';
import {BsFilterSquare} from 'react-icons/bs';
import {BsGrid, BsListUl} from 'react-icons/bs';
import {BsArrowUpRight} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';

const DashboardTable = () => {
  const navigate = useNavigate();

  const [displayType, setDisplayType] = useState(`grid`);

  const handleClick = (e) => {
    setDisplayType((prevDisplayType) => {
      if (prevDisplayType === `grid`) {
        return `list`;
      } else {
        return `grid`;
      }
    });
  };

  const data = [
    {
      Event: 'Water Fall',
      Date: '19 May 2021',
      Location: 'East Annex',
      Qty: 2203,
      Price: 1203,
      Action: () => {
        return <FiMoreHorizontal size={32} />;
      },
    },
    {
      Event: 'Tablescon',
      Date: '19 May 2011',
      Location: 'East Annex',
      Qty: 1803,
      Price: 103,
      Action: () => {
        return <FiMoreHorizontal size={32} />;
      },
    },
    {
      Event: 'Capstone Data',
      Date: '19 May 2019',
      Location: '205 Gorgas',
      Qty: 1603,
      Price: 3332,
      Action: () => {
        return <FiMoreHorizontal size={32} />;
      },
    },
    {
      Event: 'Tuscaloosa D3',
      Date: '29 June 2019',
      Location: 'Github',
      Qty: 103,
      Price: 13332,
      Action: () => {
        return <FiMoreHorizontal size={32} />;
      },
    },
    {
      Event: 'Hello World M5',
      Date: '29 June 2013',
      Location: 'Clamp',
      Qty: 13,
      Price: 432,
      Action: () => {
        return <FiMoreHorizontal size={32} />;
      },
    },
  ];
  const headers = useMemo(() => {
    return Object.keys(data[0]).map((item, index) => {
      return item;
    });
  }, [data]);

  const handleAction = (e, item) => {
    console.log(item);
  };

  return (
    <div className="pt-2">
      <div
        className={cx(
          css`
            max-width: 80rem;
            min-height: 18rem;
          `,
          `w-full border-2 p-2  rounded-lg`
        )}
      >
        <div className="flex items-center justify-between gap-2 relative w-full p-2">
          <h2 className="text-xl font-bold">Events</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="border-2 border-gray-100 px-6 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-black flex items-center gap-1"
              onClick={(e) => {
                navigate('/events', {
                  state: {},
                });
              }}
            >
              <span className="text-md">Events</span>
              <BsArrowUpRight size={16} />
            </button>

            {/* <div className="hover:cursor-pointer" onClick={handleClick}>
              {displayType === `grid` ? (
                <BsGrid size={24} />
              ) : (
                <BsListUl size={24} />
              )}
            </div> */}
          </div>
        </div>
        <div
          className={cx(
            css`
              display: none;
              @media (max-width: 900px) {
                display: flex;
              }
            `,
            `flex flex-col gap-2`
          )}
        >
          {data.map((item, i) => {
            return (
              <div key={i} className={`border-2 rounded-lg hover:bg-slate-50`}>
                {headers.map((header, j) => {
                  if (header === `Action`) {
                    return (
                      <div key={i + j} className={'p-2 flex justify-between'}>
                        <h2 className="font-bold">{header}</h2>
                        <div
                          onClick={(e) => {
                            handleAction(e, item);
                          }}
                          className={`hover:cursor-pointer`}
                        >
                          {item[header]()}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={i + j} className={'p-2 flex justify-between'}>
                      <h2 className="font-bold">{header}</h2>
                      <div>{item[header]}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <table
          className={cx(
            css`
              width: 100%;
              table-layout: fixed;
              th,
              td {
                text-align: left;
              }
              display: table;
              @media (max-width: 900px) {
                display: none;
              }
            `,
            ``
          )}
        >
          <thead className="border-b-2">
            <tr>
              {headers.map((header, index) => {
                return (
                  <th key={index} className={'p-2'}>
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={css``}>
            {data.map((item, i) => {
              return (
                <tr key={i} className={`hover:bg-slate-50`}>
                  {headers.map((header, j) => {
                    if (header === `Action`) {
                      return (
                        <td
                          key={j}
                          className={'p-2 hover:cursor-pointer'}
                          onClick={(e) => {
                            handleAction(e, item);
                          }}
                        >
                          {item[header]()}
                        </td>
                      );
                    }
                    return (
                      <td key={j} className={'p-2'}>
                        {item[header]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export {DashboardTable};
