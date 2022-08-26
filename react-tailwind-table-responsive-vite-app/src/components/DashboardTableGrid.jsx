import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {Flipper, Flipped} from 'react-flip-toolkit';

const DashboardTableGrid = ({
  data,
  headers,
  columnCount,
  forceGrid,
  gutter = `1rem`,
}) => {
  return (
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
            max-height: 36rem;
            overflow: hidden;
            overflow-y: auto;
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
              max-height: initial;
              overflow: initial;
              overflow-y: initial;
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
                            <div className={`hover:cursor-pointer`}>
                              {item[header]({item})}
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
                </Flipped>
              </div>
            </Flipped>
          );
        })}
      </motion.div>
    </Flipper>
  );
};

export {DashboardTableGrid};
