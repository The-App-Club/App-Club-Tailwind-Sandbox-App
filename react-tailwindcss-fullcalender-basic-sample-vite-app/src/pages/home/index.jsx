import '@fullcalendar/react/dist/vdom';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // allows click events
import googleCalendarPlugin from '@fullcalendar/google-calendar';

import React, { useCallback, useState, useEffect } from 'react';
import { css } from '@emotion/css';

import { Spacer } from '../../components/Spacer';
import { Layout } from '../../layouts/default';
import { useRef } from 'react';

const HomePage = () => {
  const calenderLeftRef = useRef(null);
  const calenderRightRef = useRef(null);
  // https://stackoverflow.com/questions/57229955/full-calendar-prev-next-button-in-react
  // https://stackoverflow.com/questions/72958654/connecting-full-calendar-via-google-to-react
  // https://fumiononaka.com/Business/html5/FN2107001.html

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

  return (
    <Layout className={'px-2'}>
      <div className="flex items-center gap-2">
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
          onClick={handlePrev}
        >
          Prev
        </button>
        <div
          className={css`
            width: 100%;
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

                display: flex;
                align-items: center;
                justify-content: center;
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
            ref={calenderLeftRef}
            plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: '',
              center: 'title',
              right: '',
            }}
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
            ref={calenderRightRef}
            plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: '',
              center: 'title',
              right: '',
            }}
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
            initialDate={'2022-11-01'}
          />
        </div>
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      {/* <Spacer height="100vh" /> */}
    </Layout>
  );
};

export { HomePage };
