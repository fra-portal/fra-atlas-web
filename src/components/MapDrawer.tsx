"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet-draw"

interface MapDrawerProps {
  onPolygonDrawn: (geoJson: any) => void
}

export default function MapDrawer({ onPolygonDrawn }: MapDrawerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    // Load Leaflet CSS dynamically
    if (typeof window !== 'undefined') {
      const leafletCss = document.createElement('link');
      leafletCss.rel = 'stylesheet';
      leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      leafletCss.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      leafletCss.crossOrigin = '';
      
      const leafletDrawCss = document.createElement('link');
      leafletDrawCss.rel = 'stylesheet';
      leafletDrawCss.href = 'https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.css';
      
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        document.head.appendChild(leafletCss);
      }
      if (!document.querySelector('link[href*="leaflet.draw.css"]')) {
        document.head.appendChild(leafletDrawCss);
      }
    }

    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map
    const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5) // Center of India

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    // Feature group to store drawn items
    const drawnItems = new L.FeatureGroup()
    map.addLayer(drawnItems)

    // Add draw controls
    const drawControl = new L.Control.Draw({
      position: "topright",
      draw: {
        polygon: {
          allowIntersection: false,
          shapeOptions: {
            color: "#3b82f6",
            weight: 2,
            fillOpacity: 0.3,
          },
        },
        polyline: false,
        circle: false,
        circlemarker: false,
        marker: false,
        rectangle: {
          shapeOptions: {
            color: "#3b82f6",
            weight: 2,
            fillOpacity: 0.3,
          },
        },
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    })
    map.addControl(drawControl)

    // Handle draw created event
    map.on(L.Draw.Event.CREATED, (event: any) => {
      const layer = event.layer
      drawnItems.addLayer(layer)

      // Get GeoJSON of all drawn items
      const geoJson = drawnItems.toGeoJSON()
      onPolygonDrawn(geoJson)
    })

    // Handle draw edited event
    map.on(L.Draw.Event.EDITED, () => {
      const geoJson = drawnItems.toGeoJSON()
      onPolygonDrawn(geoJson)
    })

    // Handle draw deleted event
    map.on(L.Draw.Event.DELETED, () => {
      const geoJson = drawnItems.toGeoJSON()
      onPolygonDrawn(geoJson)
    })

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [onPolygonDrawn])

  return <div ref={mapRef} className="h-full w-full" />
}
