import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {FaTemperatureHigh, FaTemperatureLow} from 'react-icons/fa';
import {TbTemperature} from 'react-icons/tb';
import {WiBarometer, WiHumidity} from 'react-icons/wi';

const Weather = () => {
  // here fetch api using swr
  return (
    <div className="w-full">
      <div
        className={cx(
          `border-t-2 p-2 w-full`,
          css`
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          `
        )}
      >
        <div className={`flex items-start flex-col`}>
          <span className="flex items-center">
            <TbTemperature size={24} />
            Temp
          </span>
          <span className="font-bold">{`${12.68}°C`}</span>
        </div>

        <div className={`flex items-start flex-col`}>
          <span className="flex items-center gap-1">
            <FaTemperatureLow size={20} />
            MinTemp
          </span>
          <span className="font-bold">{`${2.68}°C`}</span>
        </div>

        <div className={`flex items-start flex-col`}>
          <span className="flex items-center gap-1">
            <FaTemperatureHigh size={20} />
            MaxTemp
          </span>
          <span className="font-bold">{`${15.58}°C`}</span>
        </div>

        <div className={`flex items-start flex-col`}>
          <span className="flex items-center gap-1">
            <WiBarometer size={24} />
            Pressure
          </span>
          <span className="font-bold">{`${1015}Pa`}</span>
        </div>
        <div className={`flex items-start flex-col`}>
          <span className="flex items-center gap-1">
            <WiHumidity size={24} />
            Humidity
          </span>
          <span className="font-bold">{`${47}%`}</span>
        </div>
      </div>
      <div className="p-2 flex justify-end">
        <span className="font-bold text-sm">
          Lastest updated <span>{`2022/10/10 11:25:23`}</span>{' '}
          <span className="text-gray-600 dark:text-slate-400">
            from{' '}
            <Link
              href={`https://openweathermap.org/`}
              target={'_blank'}
              referrerPolicy={'no-referrer'}
            >
              <a className="hover:underline">openweathermap</a>
            </Link>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Weather;
