import {css, cx} from '@emotion/css';
import {useMemo} from 'react';
import {BsArrowRight} from 'react-icons/bs';
import {FiTrendingUp} from 'react-icons/fi';

const TrendingTags = () => {
  const data = useMemo(() => {
    return [
      {
        tagName: `Javascript`,
        value: `javascript`,
        point: `+${128}`,
      },
      {
        tagName: `Web Development`,
        value: `web-dev`,
        point: `+${28}`,
      },
      {
        tagName: `React`,
        value: `react`,
        point: `+${18}`,
      },
      {
        tagName: `CSS`,
        value: `css`,
        point: `+${1118}`,
      },
      {
        tagName: `HTML`,
        value: `html`,
        point: `+${2118}`,
      },
      {
        tagName: `See All`,
        value: `all`,
        point: null,
      },
    ];
  }, []);
  return (
    <>
      <h4 className="text-md flex items-center gap-1 pb-4 p-1">
        <span>Trending Tags</span>
        <FiTrendingUp size={24} />
      </h4>
      <ul className="flex justify-start flex-col gap-1 pt-2 border-t-2">
        {data.map((item, index) => {
          return (
            <li
              key={index}
              className={cx(
                css``,
                `flex items-center justify-between gap-1 p-1 `,
                `border-l-2 border-transparent`,
                `hover:border-l-2 hover:border-blue-900`,
                `hover:bg-gray-100 hover:cursor-pointer`
              )}
            >
              <span className="text-md">{item.tagName}</span>
              {item.point ? (
                <span className="rounded bg-slate-100 font-bold p-1">
                  {item.point}
                </span>
              ) : (
                <BsArrowRight size={24} />
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export {TrendingTags};
