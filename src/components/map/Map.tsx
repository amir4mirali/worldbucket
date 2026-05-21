'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

interface MapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  onMapClick?: (lat: number, lng: number) => void;
  markers?: Array<{
    id: string;
    lat: number;
    lng: number;
    title: string;
    color?: string;
  }>;
}

export function Map({
  latitude = 20,
  longitude = 0,
  zoom = 2,
  onMapClick,
  markers = [],
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [longitude, latitude],
      zoom: zoom,
    });

    map.current.on('click', (e) => {
      if (onMapClick) {
        onMapClick(e.lngLat.lat, e.lngLat.lng);
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [latitude, longitude, zoom, onMapClick]);

  // Update markers
  useEffect(() => {
    if (!map.current) return;

    // Remove old markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Add new markers
    markers.forEach((marker) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.backgroundColor = marker.color || '#3b82f6';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.style.border = '2px solid white';
      el.title = marker.title;

      const mapMarker = new mapboxgl.Marker(el)
        .setLngLat([marker.lng, marker.lat])
        .addTo(map.current!);

      markersRef.current[marker.id] = mapMarker;
    });
  }, [markers]);

  return (
    <div ref={mapContainer} className="h-full w-full rounded-lg overflow-hidden" />
  );
}
