import {css, cx} from '@emotion/css';
import {Listbox, Transition} from '@headlessui/react';
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/24/solid';
import {map, tidy} from '@tidyjs/tidy';
import {Fragment, useEffect, useMemo, useState} from 'react';
import {useRecoilState} from 'recoil';

import dataLocations from '@/data/locations.json';
import locationSelectorState from '@/stores/locationSelectorStore';

const LocationSelector = ({className}) => {
  const [location, setLocation] = useRecoilState(locationSelectorState);
  const [selected, setSelected] = useState({
    id: location.activeLocationId,
    name: location.activeLocationName,
  });

  const locations = useMemo(() => {
    return tidy(
      dataLocations,
      map((item) => {
        return {
          id: item.locationId,
          name: item.locationName,
        };
      })
    );
  }, []);

  useEffect(() => {
    const matchedItem = locations.find((item) => {
      return item.id === location.activeLocationId;
    });
    setSelected(matchedItem);
  }, [locations, location]);

  const handleChange = (e) => {
    setLocation({
      activeLocationId: e.id,
      activeLocationName: e.name,
    });
    setSelected(e);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div
        className={cx(
          css`
            z-index: 1;
          `,
          `relative w-60`,
          className
        )}
      >
        <Listbox.Button
          className={cx(
            `relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left`,
            `bg-gray-100 dark:bg-slate-800/90 shadow-3xl`,
            `focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300`,
            `text-sm`
          )}
        >
          <span className="block truncate">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={cx(
              `absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 ring-1`,
              `bg-white dark:bg-slate-700 shadow-3xl`,
              `ring-black ring-opacity-5 focus:outline-none`,
              `text-sm`
            )}
          >
            {locations.map((item, index) => {
              return (
                <Listbox.Option
                  key={index}
                  className={({active}) => {
                    return cx(
                      `relative cursor-pointer select-none py-2 pl-10 pr-4`,
                      active
                        ? 'bg-slate-100 dark:bg-slate-800'
                        : 'text-black dark:text-gray-100'
                    );
                  }}
                  value={item}
                >
                  {({selected}) => {
                    return (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item.name}
                        </span>
                        {selected ? (
                          <span
                            className={cx(
                              `absolute inset-y-0 left-0 flex items-center pl-3`,
                              `text-amber-600 dark:text-orange-500`
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    );
                  }}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default LocationSelector;
