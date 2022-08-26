import {css, cx} from '@emotion/css';
import {BsPersonCheck} from 'react-icons/bs';
import {AiOutlineStar} from 'react-icons/ai';
import {BiTime} from 'react-icons/bi';
import {useState} from 'react';
import {useFeedFetchType} from '../hooks/useFeedFetchType';
import {useMemo} from 'react';
import {motion} from 'framer-motion';

const FeedType = ({fetchType: lastestFetchType}) => {
  const [fetchType, setFetchType] = useState(lastestFetchType);

  const {storeFetchType} = useFeedFetchType((state) => {
    return {
      storeFetchType: state.storeFetchType,
    };
  });

  const handleSelectFetchType = (e, {fetchType: selectedFetchType}) => {
    setFetchType(selectedFetchType);
    storeFetchType({currentFetchType: selectedFetchType});
  };

  const data = useMemo(() => {
    return [
      {
        title: `Personalized`,
        fetchType: `personalized`,
        icon: () => {
          return <BsPersonCheck size={24} />;
        },
      },
      {
        title: `Featured`,
        fetchType: `featured`,
        icon: () => {
          return <AiOutlineStar size={24} />;
        },
      },
      {
        title: `Recent`,
        fetchType: `recent`,
        icon: () => {
          return <BiTime size={24} />;
        },
      },
    ];
  }, []);

  return (
    <motion.ul
      className={cx(
        css`
          position: sticky;
          top: 3rem;
          z-index: 2;
        `,
        'flex justify-start items-center gap-2 bg-white'
      )}
    >
      {data.map((item, index) => {
        return (
          <li
            key={index}
            className={cx(
              css``,
              'flex items-center gap-1 hover:cursor-pointer hover:bg-slate-50 p-2',
              `${
                fetchType === item.fetchType
                  ? 'border-b-2 border-blue-900'
                  : 'border-b-2 border-transparent'
              }`
            )}
            onClick={(e) => {
              handleSelectFetchType(e, {fetchType: item.fetchType});
            }}
          >
            {item.icon()}
            <span>{item.title}</span>
          </li>
        );
      })}
    </motion.ul>
  );
};

export {FeedType};
