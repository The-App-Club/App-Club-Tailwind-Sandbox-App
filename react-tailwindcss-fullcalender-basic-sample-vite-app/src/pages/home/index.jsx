import '@fullcalendar/react/dist/vdom';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import React, { useCallback, useState, useEffect } from 'react';

const HomePage = () => {
  return (
    <div>
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
    </div>
  );
};

export { HomePage };
