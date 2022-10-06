import '@fullcalendar/react/dist/vdom';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import React, { useCallback, useState, useEffect } from 'react';
import { css } from '@emotion/css';

import { Spacer } from '../../components/Spacer';
import { Layout } from '../../layouts/default';

const HomePage = () => {
  return (
    <Layout>
      <div
        className={css`
          display: flex;
          gap: 1rem;
          padding: 1rem;
          @media (max-width: 1000px) {
            flex-direction: column;
          }
          .fc {
            .fc-header-toolbar {
              min-height: 3rem;
              position: sticky;
              top: 3rem;
              background: rgb(255 255 255); // bg-white
              z-index: 3;
              margin: 0;
            }
            thead {
              position: sticky;
              top: 6rem;
              background: rgb(255 255 255); // bg-white
              z-index: 2;
            }
            width: 100%;
            min-height: 40rem;
            @media (max-width: 1000px) {
              min-height: 32rem;
            }
          }
        `}
      >
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale="ja"
          events={[
            { title: 'event 1', start: '2022-10-01' },
            { title: 'event 2', start: '2022-10-03', end: '2022-10-05' },
            {
              title: 'event 3',
              start: '2022-10-07T10:00:00',
            },
          ]}
        />
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale="ja"
          initialDate={'2022-11-01'}
        />
      </div>
      <Spacer height="100vh" />
    </Layout>
  );
};

export { HomePage };
