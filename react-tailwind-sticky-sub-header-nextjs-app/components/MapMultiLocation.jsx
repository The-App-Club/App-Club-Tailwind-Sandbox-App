import React, {createRef, useEffect, useMemo, useRef, useState} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import {css, cx} from '@emotion/css';
import {useRecoilValue} from 'recoil';
import {useDebouncedCallback} from 'use-debounce';

import data from '@/data/location.json';
import locationSelectorState from '@/stores/locationSelectorStore';
import multiLocationSelectorState from '@/stores/multiLocationSelectorStore';

const MapMultiLocation = ({defaultZoom = 11, className = css``}) => {
  const {activeLocationName} = useRecoilValue(locationSelectorState);
  const {activeWineryName, activeLocationNameList} = useRecoilValue(
    multiLocationSelectorState
  );
  const mapContainer = useRef(null);
  const marker = useRef(null);
  const mapInstance = useRef(null);
  const [lng, setLng] = useState(null); // 経度
  const [lat, setLat] = useState(null); // 緯度
  const [zoom, setZoom] = useState(defaultZoom);

  const multiLocation = useMemo(() => {
    return data.filter((item) => {
      return activeLocationNameList.some((activeLocationName) => {
        return activeLocationName === item.location;
      });
    });
  }, [activeLocationNameList]);

  const markersRef = useMemo(() => {
    return multiLocation.map((item) => {
      return createRef();
    });
  }, [multiLocation]);

  useEffect(() => {
    if (multiLocation.length === 0) {
      return;
    }

    const {
      latLng: [lat, lng],
    } = multiLocation[0];

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const mapboxglInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    for (let index = 0; index < multiLocation.length; index++) {
      const {
        latLng: [lat, lng],
      } = multiLocation[index];
      // Create a default Marker and add it to the mapInstance.
      markersRef[index].current = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(mapboxglInstance);
    }

    const language = new MapboxLanguage();
    mapboxglInstance.addControl(language);
    mapInstance.current = mapboxglInstance;
    setLat(lat);
    setLng(lng);

    return () => {
      mapInstance.current.remove();
    };
  }, [multiLocation, markersRef, zoom]);

  useEffect(() => {
    if (!mapInstance.current) return; // wait for mapInstance to initialize
    const {
      latLng: [lat, lng],
    } = multiLocation[0];

    setLat(lat);
    setLng(lng);

    // https://docs.mapbox.com/mapbox-gl-js/example/flyto/
    // https://docs.mapbox.com/mapbox-gl-js/example/scroll-fly-to/
    mapInstance.current.flyTo({
      center: [lng, lat],
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });
    for (let index = 0; index < multiLocation.length; index++) {
      const {
        latLng: [lat, lng],
      } = multiLocation[index];
      // Create a default Marker and add it to the mapInstance.
      markersRef[index].current?.setLngLat([lng, lat]);
    }

    return () => {
      mapInstance.current?.remove();
      markersRef.map((markerRef) => {
        return markerRef.current?.remove();
      });
    };
  }, [multiLocation, markersRef]);

  useEffect(() => {
    if (!mapInstance.current) return; // wait for mapInstance to initialize
    mapInstance.current.on('move', () => {
      setLng(mapInstance.current.getCenter().lng.toFixed(4));
      setLat(mapInstance.current.getCenter().lat.toFixed(4));
      setZoom(mapInstance.current.getZoom().toFixed(2));
    });
  }, []);

  const handleResize = useDebouncedCallback((e) => {
    if (!mapInstance.current) return; // wait for mapInstance to initialize
    mapInstance.current.resize();
  }, 600);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <div className={cx('w-full p-2', className)}>
      <div
        className={cx(
          css`
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 0.5rem;
          `,
          `text-sm`
        )}
      >
        <div className={`flex items-start flex-col`}>
          <span className="flex items-center gap-1">
            Matched Location {multiLocation.length}items.please zoom in/out.
          </span>
        </div>
      </div>
      <div
        ref={mapContainer}
        className={css`
          height: 300px;
          @media (max-width: 768px) {
            height: 200px;
          }
        `}
      />
    </div>
  );
};

export default MapMultiLocation;
