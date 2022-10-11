import React, {useRef, useEffect, useState} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import {css, cx} from '@emotion/css';
import {useDebouncedCallback} from 'use-debounce';

import data from '../data/location.json';
import {useCallback} from 'react';
import {useRecoilValue} from 'recoil';
import locationSelectorState from '../stores/locationSelectorStore';

const Map = ({defaultZoom = 11, showGeoInfo = false, className = css``}) => {
  const {activeLocationName} = useRecoilValue(locationSelectorState);
  const mapContainer = useRef(null);
  const marker = useRef(null);
  const mapInstance = useRef(null);
  const [lng, setLng] = useState(null); // 経度
  const [lat, setLat] = useState(null); // 緯度
  const [zoom, setZoom] = useState(defaultZoom);

  const getMatchedLocation = useCallback(() => {
    return data.find((item) => {
      return item.location === activeLocationName;
    });
  }, [activeLocationName]);

  useEffect(() => {
    if (mapInstance.current) return; // only once initialize
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const {
      latLng: [lat, lng],
    } = getMatchedLocation();
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
  }, [lng, lat, zoom, getMatchedLocation]);

  useEffect(() => {
    if (!mapInstance.current) return; // wait for mapInstance to initialize
    const {
      latLng: [lat, lng],
    } = getMatchedLocation();
    setLat(lat);
    setLng(lng);

    // https://docs.mapbox.com/mapbox-gl-js/example/flyto/
    // https://docs.mapbox.com/mapbox-gl-js/example/scroll-fly-to/
    mapInstance.current.flyTo({
      center: [lng, lat],
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });

    marker.current.setLngLat([lng, lat]);
  }, [activeLocationName, getMatchedLocation]);

  useEffect(() => {
    if (!mapInstance.current) return; // wait for mapInstance to initialize
    mapInstance.current.on('move', () => {
      setLng(mapInstance.current.getCenter().lng.toFixed(4));
      setLat(mapInstance.current.getCenter().lat.toFixed(4));
      setZoom(mapInstance.current.getZoom().toFixed(2));
    });
  }, [lng, lat]);

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
      {showGeoInfo && (
        <div
          className={css`
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 1rem;
          `}
        >
          <div
            className={css`
              display: flex;
              align-items: flex-start;
              flex-direction: column;
            `}
          >
            Longitude<span className="font-bold">{lng}</span>
          </div>
          <div
            className={css`
              display: flex;
              align-items: flex-start;
              flex-direction: column;
            `}
          >
            Latitude<span className="font-bold">{lat}</span>
          </div>
          <div
            className={css`
              display: flex;
              align-items: flex-start;
              flex-direction: column;
            `}
          >
            Zoom<span className="font-bold">{zoom}</span>
          </div>
        </div>
      )}
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
