import {Spacer} from '../../components/Spacer';
import {css, cx} from '@emotion/css';
import {default as Layout} from '../../layouts/default';
import {createRef, useCallback, useEffect, useState} from 'react';
import {useRef} from 'react';
import {useKeyPress} from '../../hooks/useKeyPress';
import {useDebouncedCallback} from 'use-debounce';
import {useMemo} from 'react';
import {motion} from 'framer-motion';
import {useActiveIndexStore} from '../../hooks/useActiveIndexStore';
import swal from 'sweetalert';

import {BiTrendingUp} from 'react-icons/bi';
import {AiOutlineEnter} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';

const data = [
  {
    title: `sample 11`,
    markIcon: () => {
      return <BiTrendingUp size={24} />;
    },
    actionIcon: () => {
      return <AiOutlineEnter size={16} />;
    },
  },
  {
    title: `sample 12`,
    markIcon: () => {
      return <BiTrendingUp size={24} />;
    },
    actionIcon: () => {
      return <AiOutlineEnter size={16} />;
    },
  },
  {
    title: `sample 13`,
    markIcon: () => {
      return <BiTrendingUp size={24} />;
    },
    actionIcon: () => {
      return <AiOutlineEnter size={16} />;
    },
  },
  {
    title: `sample 21`,
    markIcon: () => {
      return <BiTrendingUp size={24} />;
    },
    actionIcon: () => {
      return <AiOutlineEnter size={16} />;
    },
  },
  {
    title: `sample 22`,
    markIcon: () => {
      return <BiTrendingUp size={24} />;
    },
    actionIcon: () => {
      return <AiOutlineEnter size={16} />;
    },
  },
  {
    title: `sample 31`,
    markIcon: () => {
      return <BiTrendingUp size={24} />;
    },
    actionIcon: () => {
      return <AiOutlineEnter size={16} />;
    },
  },
  {
    title: `sample 32`,
    markIcon: () => {
      return <BiTrendingUp size={24} />;
    },
    actionIcon: () => {
      return <AiOutlineEnter size={16} />;
    },
  },
  {
    title: `sample 33`,
    markIcon: () => {
      return <BiTrendingUp size={24} />;
    },
    actionIcon: () => {
      return <AiOutlineEnter size={16} />;
    },
  },
  {
    title: `sample 34`,
    markIcon: () => {
      return <BiTrendingUp size={24} />;
    },
    actionIcon: () => {
      return <AiOutlineEnter size={16} />;
    },
  },
  {
    title: `sample 41`,
    markIcon: () => {
      return <BiTrendingUp size={24} />;
    },
    actionIcon: () => {
      return <AiOutlineEnter size={16} />;
    },
  },
  {
    title: `sample 51`,
    markIcon: () => {
      return <BiTrendingUp size={24} />;
    },
    actionIcon: () => {
      return <AiOutlineEnter size={16} />;
    },
  },
  {
    title: `sample 52`,
    markIcon: () => {
      return <BiTrendingUp size={24} />;
    },
    actionIcon: () => {
      return <AiOutlineEnter size={16} />;
    },
  },
];

const EventPage = ({pageName, notifier}) => {
  const navigate = useNavigate();

  const scrollContainerDomRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const {keyPressed: enterPress} = useKeyPress({expectedPressKey: 'Enter'});
  const {keyPressed: escapePress} = useKeyPress({expectedPressKey: 'Escape'});
  const {keyPressed: arrowDownPress, tik: arrowDownTik} = useKeyPress({
    expectedPressKey: 'ArrowDown',
  });
  const {keyPressed: arrowUpPress, tik: arrowUpTik} = useKeyPress({
    expectedPressKey: 'ArrowUp',
  });
  const [filteredData, setFilteredData] = useState(data);

  const {activeIndex, resetActiveIndex, storeActiveIndex} = useActiveIndexStore(
    (state) => {
      return {
        activeIndex: state.activeIndex,
        resetActiveIndex: state.resetActiveIndex,
        storeActiveIndex: state.storeActiveIndex,
      };
    }
  );

  const itemsDomRef = useMemo(() => {
    return data.map((item) => {
      return createRef();
    });
  }, [data]);

  const searchInputRef = useRef(null);
  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (escapePress) {
      searchInputRef.current.blur();
    }
  }, [escapePress]);

  useEffect(() => {
    if (arrowUpPress) {
      storeActiveIndex({pressType: `arrowUp`, maxSize: filteredData.length});
      if (activeIndex === 0) {
        scrollContainerDomRef.current.scrollTo(
          0,
          scrollContainerDomRef.current.offsetHeight
        );
        return;
      }
      scrollContainerDomRef.current.scrollTo(
        0,
        Math.max(0, activeIndex - 3) * 48 // 3 is offset
      );
    }
  }, [arrowUpPress, filteredData, arrowUpTik]);

  useEffect(() => {
    if (arrowDownPress) {
      storeActiveIndex({pressType: `arrowDown`, maxSize: filteredData.length});
      if (data.length === activeIndex + 1) {
        scrollContainerDomRef.current.scrollTo(0, 0);
        return;
      }
      scrollContainerDomRef.current.scrollTo(
        0,
        Math.max(0, activeIndex - 2) * 48 // 2 is offset
      );
    }
  }, [arrowDownPress, filteredData, arrowDownTik]);

  useEffect(() => {
    // document.activeElement !== searchInputRef.current
    if (enterPress) {
      const {title} = filteredData[activeIndex];
      navigate('/result', {
        state: {title},
      });
    }
  }, [enterPress, filteredData, activeIndex]);

  const handleSearch = (e, index) => {
    const doIndex = index || activeIndex;
    const {title} = filteredData[doIndex];
    navigate('/result', {
      state: {title},
    });
    searchInputRef.current.focus();
    if (window.matchMedia('(max-width: 768px)').matches) {
      searchInputRef.current.blur();
      return;
    }
  };

  const handleChange = useDebouncedCallback(
    (e) => {
      const term = searchInputRef.current.value;
      setSearchTerm(term);
      const result = data.filter((item) => {
        return item.title.indexOf(term) !== -1;
      });
      if (result.length > 0) {
        resetActiveIndex();
      }
      setFilteredData(result);
    },
    // delay in ms
    1000
  );

  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section
        className={cx(css``, `max-w-2xl mx-auto w-full relative p-2 pt-12`)}
      >
        <div
          className={cx(
            css``,
            `pt-8 flex justify-center items-center flex-col`
          )}
        >
          <h2 className="text-3xl pb-2">EventPage</h2>
          <form
            className="relative w-full"
            onSubmit={(e) => {
              e.preventDefault();
              return false;
            }}
          >
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div className="relative w-full">
              <div className="flex absolute w-full inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                ref={searchInputRef}
                type="search"
                className="block p-4 pl-10 w-full focus:outline-none border-2 rounded-lg focus:border-blue-300"
                placeholder="Search..."
                onChange={handleChange}
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                onClick={(e) => {}}
              >
                Esc
              </button>
            </div>
          </form>
          <p className="py-2">press key arrow down or arrow up.</p>
          {filteredData.length === 0 ? (
            <p>No match.</p>
          ) : (
            <ul
              ref={scrollContainerDomRef}
              className={cx(
                css`
                  max-width: 100%;
                  width: 100%;
                  max-height: 20rem;
                `,
                'w-full border-2 rounded-lg bg-white overflow-hidden overflow-y-auto scrollbar-none'
              )}
            >
              {filteredData.map((item, index) => {
                return (
                  <motion.li
                    key={index}
                    ref={itemsDomRef[index]}
                    tabIndex={index + 2}
                    onClick={(e) => {
                      storeActiveIndex({
                        pressType: `select`,
                        selectedIndex: index,
                        maxSize: data.length,
                      });
                      handleSearch(e, index);
                    }}
                    className={cx(
                      css`
                        height: 48px;
                        width: 100%;
                      `,
                      `relative flex items-center gap-2 p-2 hover:cursor-pointer hover:bg-gray-100`,
                      `${activeIndex === index ? 'bg-gray-100' : ''}`
                    )}
                  >
                    {item.markIcon()}
                    <span className={'text-lg'}>{`${item.title}`}</span>
                    <span className="absolute right-2 flex items-center gap-2">
                      {item.actionIcon()}
                      <span className="text-xs text-gray-600 font-medium">
                        enter
                      </span>
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </Layout>
  );
};

export {EventPage};
