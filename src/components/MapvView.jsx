import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

function MapView({ data, selectedId, onMarkerClick }) {
  return (
    <MapContainer
      center={[28.6, 77.2]}
      zoom={6}
      className="h-100 w-full"
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup chunkedLoading>
        {data.map(item => (
          <Marker
            key={item.id}
            position={[item.lat, item.lng]}
            eventHandlers={{
              click: () => onMarkerClick(item.id),
            }}
          >
            <Popup>
              <strong>{item.project}</strong><br />
              Status: {item.status}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default MapView;
