import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const mapRef = useRef();  // Menyimpan referensi peta
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    if (mapRef.current) {
      // Membuat instance peta setelah komponen pertama kali dimounting
      const map = L.map(mapRef.current, {
        center: [51.505, -0.09],  // Koordinat default peta
        zoom: 13,
      });

      // Menambahkan TileLayer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      
      // Menyimpan instance peta ke state
      setMapInstance(map);
    }
  }, []);

  useEffect(() => {
    if (mapInstance) {
      // Mengambil file GeoJSON dan menambahkannya ke peta
      fetch('maps/grid_tngd.geojson')
        .then(response => response.json())
        .then(data => {
          // Menambahkan layer GeoJSON ke peta
          const geoJsonLayer = L.geoJSON(data).addTo(mapInstance);

          // Menyesuaikan peta dengan bounds dari GeoJSON layer
          geoJsonLayer.on('ready', function () {
            mapInstance.fitBounds(geoJsonLayer.getBounds());
          });
        })
        .catch(error => console.error('Error loading GeoJSON:', error));
    }
  }, [mapInstance]); // Akan dipanggil hanya jika mapInstance sudah terbuat

  return (
    <div style={{ height: '500px' }}>
      <MapContainer
        center={[-2.620, 119.220]} // Center di Sulawesi Barat
        zoom={8}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;