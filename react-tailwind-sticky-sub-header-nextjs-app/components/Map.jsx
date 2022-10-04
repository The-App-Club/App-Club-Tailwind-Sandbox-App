import React, {useRef, useEffect, useState} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import {css} from '@emotion/css';
import {useDebouncedCallback} from 'use-debounce';

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(12.550343); // 経度
  const [lat, setLat] = useState(55.665957); // 緯度
  const [zoom, setZoom] = useState(8);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const mapboxglInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker()
      .setLngLat([12.554729, 55.70651])
      .addTo(mapboxglInstance);

    // Create a default Marker, colored black, rotated 45 degrees.
    const marker2 = new mapboxgl.Marker({color: 'black', rotation: 45})
      .setLngLat([12.65147, 55.608166])
      .addTo(mapboxglInstance);

    const language = new MapboxLanguage();
    mapboxglInstance.addControl(language);
    map.current = mapboxglInstance;
  }, [lng, lat, zoom]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

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
