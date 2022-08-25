import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useMemo, useState} from 'react';
import {FiMoreHorizontal} from 'react-icons/fi';
import {BsFilterSquare} from 'react-icons/bs';
import {BsGrid, BsListUl} from 'react-icons/bs';
import {BsArrowUpRight} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
import {Flipper, Flipped} from 'react-flip-toolkit';
import {SelectListBox} from './SelectListBox';

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

const DashboardTable = ({gutter = `1rem`}) => {
  const navigate = useNavigate();
  const [displayType, setDisplayType] = useState(`list`);
  const [forceGrid, setForceGrid] = useState(false);
  const [columnCount, setColumnCount] = useState(4);

  const handleClick = (e) => {
    setDisplayType((prevDisplayType) => {
      if (prevDisplayType === `grid`) {
        setForceGrid(false);
        return `list`;
      } else {
        setForceGrid(true);
        return `grid`;
      }
    });
  };

  const handleNcolumns = ({selected, isFirst}) => {
    if (isFirst) {
      return;
    }
    const {value} = selected;
    setColumnCount(value);
    setForceGrid(true);
    setDisplayType((prevDisplayType) => {
      if (prevDisplayType === `list`) {
        return `grid`;
      }
      return prevDisplayType;
    });
  };

  const headers = useMemo(() => {
    return Object.keys(data[0]).map((item, index) => {
      return item;
    });
  }, [data]);

  const handleAction = (e, item) => {
    console.log(item);
  };

  return (
    <div className={cx(css``, `w-full border-2 rounded-lg overflow-hidden`)}>
      <div
        className={cx(
          css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            @media (max-width: 768px) {
              justify-content: center;
              flex-direction: column;
            }
          `,
          `relative w-full px-4 pt-4`
        )}
      >
        <div className={`flex items-center justify-start gap-2`}>
          <h2 className="text-xl font-bold">Events</h2>
          <button
            type="button"
            className={cx(
              css``,
              `border-2 border-gray-300 rounded-lg`,
              `px-6 py-2 bg-gray-50 hover:bg-gray-100 text-black`,
              `flex items-center gap-1`
            )}
            onClick={(e) => {
              navigate('/events', {
                state: {},
              });
            }}
          >
            <span className="text-md">Events</span>
            <BsArrowUpRight size={16} />
          </button>
        </div>
        <div
          className={cx(
            css`
              max-width: 20rem;
              @media (max-width: 1100px) {
                max-width: initial;
              }
            `,
            `flex items-center gap-2 w-full justify-end`
          )}
        >
          <SelectListBox
            notifier={handleNcolumns}
            className={css`
              @media (max-width: 1100px) {
                display: none;
              }
            `}
          />
          <div
            className={cx(
              css`
                @media (max-width: 1100px) {
                  display: none;
                }
              `,
              'hover:cursor-pointer'
            )}
            onClick={handleClick}
          >
            {displayType === `grid` ? (
              <BsGrid size={32} />
            ) : (
              <BsListUl size={32} />
            )}
          </div>
        </div>
      </div>
      <Flipper
        flipKey={columnCount}
        className={css`
          display: ${forceGrid ? 'block' : 'none'};
          @media (max-width: 768px) {
            display: block;
          }
        `}
        onStart={(e) => {}}
        onComplete={(e) => {}}
      >
        <motion.div
          className={cx(
            css`
              width: 100%;
              display: grid;
              grid-template-columns: repeat(${columnCount}, 1fr);
              gap: ${gutter};
              padding: ${gutter};
              @media (max-width: 1100px) {
                grid-template-columns: repeat(3, 1fr);
              }
              @media (max-width: 850px) {
                grid-template-columns: repeat(2, 1fr);
              }
              @media (max-width: 768px) {
                grid-template-columns: repeat(1, 1fr);
              }
            `
          )}
        >
          {data.map((item, i) => {
            return (
              <Flipped key={i} flipId={`item-${item.Event}`}>
                <div
                  key={i}
                  className={cx(css``, `border-2 rounded-lg hover:bg-gray-100`)}
                >
                  <Flipped inverseFlipId={`item-${item.Event}`} scale>
                    <div>
                      {headers.map((header, j) => {
                        if (header === `Action`) {
                          return (
                            <div
                              key={i + j}
                              className={'p-2 flex justify-between'}
                            >
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
                          <div
                            key={i + j}
                            className={'p-2 flex justify-between'}
                          >
                            <h2 className="font-bold">{header}</h2>
                            <div>{item[header]}</div>
                          </div>
                        );
                      })}
                    </div>
                  </Flipped>
                </div>
              </Flipped>
            );
          })}
        </motion.div>
      </Flipper>
      <table
        className={cx(
          css`
            position: relative;
            width: 100%;
            height: 20rem;
            overflow: hidden;
            overflow-y: auto;
            border-collapse: collapse;
            th,
            td {
              text-align: left;
            }
            display: ${forceGrid ? 'none' : 'table'};
            @media (max-width: 768px) {
              display: none;
            }
          `,
          ``
        )}
      >
        <thead
          className={cx(
            css`
              position: sticky;
              top: 0;
              z-index: 1;
            `,
            'border-b-2 w-full'
          )}
        >
          <tr className="w-full">
            {headers.map((header, index) => {
              return (
                <th key={index} className={'p-4'}>
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className={`w-full`}>
          {data.map((item, i) => {
            return (
              <tr key={i} className={`hover:bg-gray-100 w-full`}>
                {headers.map((header, j) => {
                  if (header === `Action`) {
                    return (
                      <td
                        key={j}
                        className={'p-4 hover:cursor-pointer'}
                        onClick={(e) => {
                          handleAction(e, item);
                        }}
                      >
                        {item[header]()}
                      </td>
                    );
                  }
                  return (
                    <td key={j} className={'p-4'}>
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
  );
};

export {DashboardTable};
