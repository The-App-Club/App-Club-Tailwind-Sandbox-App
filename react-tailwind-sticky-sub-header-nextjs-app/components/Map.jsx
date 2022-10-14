import React, {useRef, useEffect, useState, useMemo} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import {css, cx} from '@emotion/css';
import {useDebouncedCallback} from 'use-debounce';

import data from '../data/location.json';
import {useCallback} from 'react';
import {useRecoilValue} from 'recoil';
import locationSelectorState from '../stores/locationSelectorStore';

import {TbWorldLatitude, TbWorldLongitude, TbZoomPan} from 'react-icons/tb';

const Map = ({defaultZoom = 11, className = css``}) => {
  const {activeLocationName} = useRecoilValue(locationSelectorState);
  const mapContainer = useRef(null);
  const marker = useRef(null);
  const mapInstance = useRef(null);
  const [lng, setLng] = useState(null); // 経度
  const [lat, setLat] = useState(null); // 緯度
  const [zoom, setZoom] = useState(defaultZoom);

  const matchedLocation = useMemo(() => {
    if (!activeLocationName) {
      return;
    }
    return data.find((item) => {
      return item.location === activeLocationName;
    });
  }, [activeLocationName]);

  useEffect(() => {
    if (!matchedLocation) {
      return;
    }
    if (mapInstance.current) return; // only once initialize
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const {
      latLng: [lat, lng],
    } = matchedLocation;
    const mapboxglInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    // Create a default Marker and add it to the mapInstance.
    marker.current = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(mapboxglInstance);

    const language = new MapboxLanguage();
    mapboxglInstance.addControl(language);
    mapInstance.current = mapboxglInstance;

    setLat(lat);
    setLng(lng);
  }, [lng, lat, zoom, matchedLocation]);

  useEffect(() => {
    if (!matchedLocation) {
      return;
    }
    if (!mapInstance.current) return; // wait for mapInstance to initialize
    const {
      latLng: [lat, lng],
    } = matchedLocation;
    setLat(lat);
    setLng(lng);

    // https://docs.mapbox.com/mapbox-gl-js/example/flyto/
    // https://docs.mapbox.com/mapbox-gl-js/example/scroll-fly-to/
    mapInstance.current.flyTo({
      center: [lng, lat],
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });

    marker.current.setLngLat([lng, lat]);
  }, [activeLocationName, matchedLocation]);

  useEffect(() => {
    if (!mapInstance.current) return; // wait for mapInstance to initialize
    mapInstance.current.on('move', () => {
      setLng(mapInstance.current.getCenter().lng.toFixed(4));
      setLat(mapInstance.current.getCenter().lat.toFixed(4));
      setZoom(mapInstance.current.getZoom().toFixed(2));
    });
    mapInstance.current.on('data', (e) => {
      setLng(mapInstance.current.getCenter().lng.toFixed(4));
      setLat(mapInstance.current.getCenter().lat.toFixed(4));
      setZoom(mapInstance.current.getZoom().toFixed(2));
    });

    return () => {};
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
            <TbWorldLongitude size={24} />
            Longitude
          </span>
          <span className="font-bold">{lng}</span>
        </div>
        <div className={`flex items-start flex-col`}>
          <span className="flex items-center gap-1">
            <TbWorldLatitude size={24} />
            Latitude
          </span>
          <span className="font-bold">{lat}</span>
        </div>
        <div className={`flex items-start flex-col`}>
          <span className="flex items-center gap-1">
            <TbZoomPan size={24} />
            Zoom
          </span>
          <span className="font-bold">{zoom}</span>
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

export default Map;
