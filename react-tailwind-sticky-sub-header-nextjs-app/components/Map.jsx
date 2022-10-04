import React, {useRef, useEffect, useState} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import {css} from '@emotion/css';
import {useDebouncedCallback} from 'use-debounce';

import data from '../data/location.json';
import {useCallback} from 'react';

const Map = ({activeLocationName}) => {
  const mapContainer = useRef(null);
  const marker = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(null); // 経度
  const [lat, setLat] = useState(null); // 緯度
  const [zoom, setZoom] = useState(16);

  const getMatchedLocation = useCallback(() => {
    return data.find((item) => {
      return item.location === activeLocationName;
    });
  }, [activeLocationName]);

  useEffect(() => {
    if (map.current) return; // only once initialize
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

    // Create a default Marker and add it to the map.
    marker.current = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(mapboxglInstance);

    const language = new MapboxLanguage();
    mapboxglInstance.addControl(language);
    map.current = mapboxglInstance;

    setLat(lat);
    setLng(lng);
  }, [lng, lat, zoom, getMatchedLocation]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    const {
      latLng: [lat, lng],
    } = getMatchedLocation();
    setLat(lat);
    setLng(lng);

    // https://docs.mapbox.com/mapbox-gl-js/example/flyto/
    // https://docs.mapbox.com/mapbox-gl-js/example/scroll-fly-to/
    map.current.flyTo({
      center: [lng, lat],
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });

    marker.current.setLngLat([lng, lat]);
  }, [activeLocationName, getMatchedLocation]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [lng, lat]);

  const handleResize = useDebouncedCallback((e) => {
    if (!map.current) return; // wait for map to initialize
    map.current.resize();
  }, 600);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <div>
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
      <div
        ref={mapContainer}
        className={css`
          height: 400px;
        `}
      />
    </div>
  );
};

export default Map;
