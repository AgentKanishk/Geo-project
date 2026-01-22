import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapController({ selectedId, data }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedId !== null) {
      const selectedItem = data.find(item => item.id === selectedId);
      if (selectedItem) {
        map.flyTo([selectedItem.lat, selectedItem.lng], 13, {
          duration: 1.5,
          easeLinearity: 0.25
        });
      }
    }
  }, [selectedId, data, map]);
  
  return null;
}

export default function MapView({ data, selectedId, onMarkerClick }) {
  return (
    <div className="h-full rounded-xl overflow-hidden shadow-2xl border border-gray-700">
      <MapContainer
        center={[28.6, 77.2]}
        zoom={6}
        className="h-full w-full"
        style={{ background: '#1a1a2e' }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController selectedId={selectedId} data={data} />

        <MarkerClusterGroup chunkedLoading>
          {data.map(item => (
            <Marker
              key={item.id}
              position={[item.lat, item.lng]}
              icon={item.id === selectedId ? redIcon : blueIcon}
              eventHandlers={{
                click: () => onMarkerClick(item.id),
              }}
            >
              <Popup>
                <div className="text-sm">
                  <strong className="text-base text-gray-800">{item.project}</strong>
                  <div className="mt-1 text-gray-600">Status: <span className={item.status === 'Active' ? 'text-green-600 font-semibold' : 'text-blue-600 font-semibold'}>{item.status}</span></div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
