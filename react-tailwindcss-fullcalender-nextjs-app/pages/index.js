import '@fullcalendar/react/dist/vdom';
import FullCalendar, {formatDate} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // allows click events
import React, {useRef, useCallback, useState, useEffect} from 'react';
import {css, cx} from '@emotion/css';
import Layout from '@/layouts/default';
import dayjs from 'dayjs';
import themeState from '@/stores/themeStore';
import {useRecoilValue} from 'recoil';

const decideCalenderControlerColor = ({mode}) => {
  if (mode === `dark`) {
    return css`
      --tw-bg-opacity: 1;
      background-color: rgb(51 65 85 / var(--tw-bg-opacity));
      --tw-text-opacity: 1;
      color: rgb(255 255 255 / var(--tw-text-opacity));
    `;
  }
  return css``;
};
const decideCalenderColor = ({mode}) => {
  if (mode === `dark`) {
    return css`
      .fc {
        .fc-header-toolbar {
          --tw-bg-opacity: 1;
          background-color: rgb(51 65 85 / var(--tw-bg-opacity));
          --tw-text-opacity: 1;
          color: rgb(255 255 255 / var(--tw-text-opacity));
        }
        thead {
          --tw-bg-opacity: 1;
          background-color: rgb(51 65 85 / var(--tw-bg-opacity));
          --tw-text-opacity: 1;
          color: rgb(255 255 255 / var(--tw-text-opacity));
        }
      }
    `;
  }
  return css``;
};

const HomePage = () => {
  const {mode} = useRecoilValue(themeState);
  const [isClient, setIsClient] = useState(null);
  const calenderLeftRef = useRef(null);
  const calenderRightRef = useRef(null);
  const handlePrev = (e) => {
    console.log(`prev`);
    calenderLeftRef.current.getApi().prev();
    calenderRightRef.current.getApi().prev();
  };
  const handleNext = (e) => {
    console.log(`next`);
    calenderLeftRef.current.getApi().next();
    calenderRightRef.current.getApi().next();
  };

  useEffect(() => {
    setIsClient(new Date());
  }, []);

  return (
    <Layout className={'mt-12 px-2'}>
      <div
        className={cx(
          css`
            min-height: 3rem;
            position: sticky;
            top: 3rem;
            background: rgb(255 255 255); // bg-white
            z-index: 4;
            display: none;
            @media (max-width: 768px) {
              display: flex;
              align-items: center;
              gap: 1rem;
            }
          `,
          isClient && decideCalenderControlerColor({mode})
        )}
      >
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          className={cx(
            'px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl',
            css`
              display: block;
              @media (max-width: 768px) {
                display: none;
              }
            `
          )}
          onClick={handlePrev}
        >
          Prev
        </button>
        <div
          className={cx(
            css`
              width: 100%;
              display: flex;
              gap: 1rem;
              @media (max-width: 1000px) {
                flex-direction: column;
              }
              .fc {
                .fc-header-toolbar {
                  min-height: 3rem;
                  position: sticky;
                  top: 3rem;
                  @media (max-width: 768px) {
                    top: 6rem;
                  }
                  background: rgb(255 255 255); // bg-white
                  z-index: 3;
                  margin: 0;

                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                thead {
                  position: sticky;
                  top: 6rem;
                  @media (max-width: 768px) {
                    top: 9rem;
                  }
                  background: rgb(255 255 255); // bg-white
                  z-index: 2;
                }
                width: 100%;
                min-height: 40rem;
                @media (max-width: 1000px) {
                  min-height: 32rem;
                }
              }
            `,
            isClient && decideCalenderColor({mode})
          )}
        >
          {isClient && (
            <FullCalendar
              ref={calenderLeftRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: '',
                center: 'title',
                right: '',
              }}
              locale="ja"
            />
          )}
          {isClient && (
            <FullCalendar
              ref={calenderRightRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: '',
                center: 'title',
                right: '',
              }}
              locale="ja"
              initialDate={dayjs().add(1, 'months').format('YYYY-MM-DD')}
            />
          )}
        </div>
        <button
          className={cx(
            'px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl',
            css`
              display: block;
              @media (max-width: 768px) {
                display: none;
              }
            `
          )}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </Layout>
  );
};

export default HomePage;
