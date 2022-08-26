import {css, cx} from '@emotion/css';
import {useMemo, useState} from 'react';
import {FiMoreHorizontal} from 'react-icons/fi';
import {useNavigate} from 'react-router-dom';
import {DashboardTableList} from './DashboardTableList';
import {DashboardTableGrid} from './DashboardTableGrid';
import {DashboardTableController} from './DashboardTableController';

import {DashboardTableShortHandMenu} from './DashboardTableShortHandMenu';

const DashboardTable = ({gutter = `1rem`}) => {
  const navigate = useNavigate();
  const [displayType, setDisplayType] = useState(`list`);
  const [forceGrid, setForceGrid] = useState(false);
  const [columnCount, setColumnCount] = useState(2);

  const data = useMemo(() => {
    return [
      {
        Event: 'Water Fall',
        Date: '19 May 2021',
        Location: 'East Annex',
        Qty: 2203,
        Price: 1203,
        Action: ({item}) => {
          return <DashboardTableShortHandMenu item={item} />;
        },
      },
      {
        Event: 'Tablescon',
        Date: '19 May 2011',
        Location: 'East Annex',
        Qty: 1803,
        Price: 103,
        Action: ({item}) => {
          return <DashboardTableShortHandMenu item={item} />;
        },
      },
      {
        Event: 'Capstone Data',
        Date: '19 May 2019',
        Location: '205 Gorgas',
        Qty: 1603,
        Price: 3332,
        Action: ({item}) => {
          return <DashboardTableShortHandMenu item={item} />;
        },
      },
      {
        Event: 'Tuscaloosa D3',
        Date: '29 June 2019',
        Location: 'Github',
        Qty: 103,
        Price: 13332,
        Action: ({item}) => {
          return <DashboardTableShortHandMenu item={item} />;
        },
      },
      {
        Event: 'Hello World M5',
        Date: '29 June 2013',
        Location: 'Clamp',
        Qty: 13,
        Price: 432,
        Action: ({item}) => {
          return <DashboardTableShortHandMenu item={item} />;
        },
      },
    ];
  }, []);

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

  return (
    <div className={cx(css``, `w-full border-2 rounded-lg overflow-hidden`)}>
      <DashboardTableController
        displayType={displayType}
        handleClick={handleClick}
        handleNcolumns={handleNcolumns}
      />
      <DashboardTableGrid
        columnCount={columnCount}
        data={data}
        forceGrid={forceGrid}
        headers={headers}
        gutter={`1rem`}
      />
      <DashboardTableList forceGrid={forceGrid} data={data} headers={headers} />
    </div>
  );
};

export {DashboardTable};
