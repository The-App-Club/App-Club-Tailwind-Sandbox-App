import {css, cx} from '@emotion/css';

const DashboardTableList = ({forceGrid, headers, data}) => {
  const handleAction = (e, item) => {
    console.log(item);
  };
  return (
    <table
      className={cx(
        css`
          position: relative;
          width: 100%;
          overflow: hidden;
          overflow-y: auto;
          border-collapse: collapse;
          th,
          td {
            text-align: left;
          }
          display: ${forceGrid ? 'none' : 'table'};
          @media (max-width: 768px) {
            display: none;
          }
        `,
        ``
      )}
    >
      <thead className={cx(css``, 'border-b-2 w-full')}>
        <tr className="w-full">
          {headers.map((header, index) => {
            return (
              <th key={index} className={'p-4'}>
                {header}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody className={`w-full`}>
        {data.map((item, i) => {
          return (
            <tr key={i} className={`hover:bg-gray-100 w-full`}>
              {headers.map((header, j) => {
                if (header === `Action`) {
                  return (
                    <td
                      key={j}
                      className={'p-4 hover:cursor-pointer'}
                      onClick={(e) => {
                        handleAction(e, item);
                      }}
                    >
                      {item[header]()}
                    </td>
                  );
                }
                return (
                  <td key={j} className={'p-4'}>
                    {item[header]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export {DashboardTableList};
