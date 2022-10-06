import '@fullcalendar/react/dist/vdom';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // allows click events
import googleCalendarPlugin from '@fullcalendar/google-calendar';

import React, { useCallback, useState, useEffect } from 'react';
import { css } from '@emotion/css';

import { Spacer } from '../../components/Spacer';
import { Layout } from '../../layouts/default';

const HomePage = () => {
  // https://stackoverflow.com/questions/72958654/connecting-full-calendar-via-google-to-react

  useEffect(() => {
    console.log(import.meta.env.VITE_APP_GOOGLE_API_KEY);
  }, []);

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
          plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
          initialView="dayGridMonth"
          locale="ja"
          googleCalendarApiKey={import.meta.env.VITE_APP_GOOGLE_API_KEY}
          eventClick={({ el, event, jsEvent, view }) => {
            jsEvent.preventDefault();
            console.log(`el,event,jsEvent,view`, el, event, jsEvent, view);
          }}
          eventSources={[
            {
              display: 'Sample Event 1',
              googleCalendarId: 'sample1@group.calendar.google.com',
              color: 'rgb(120 53 15)', // text-amber-900
            },
            {
              display: 'Sample Event 2',
              googleCalendarId: 'sample2@group.calendar.google.com',
              color: 'rgb(6 78 59)', // text-emerald-900
            },
            {
              display: 'Sample Event 3',
              googleCalendarId: 'sample3@group.calendar.google.com',
              color: 'rgb(12 74 110)', // text-sky-900
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
