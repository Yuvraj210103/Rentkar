"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// react-leaflet uses window, so import dynamically without SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});

const customIcon = new L.Icon({
  iconUrl: "/location-pin.png", // Path to your icon image
  iconSize: [38, 38], // Size of the icon
  iconAnchor: [19, 38], // Point of the icon corresponding to the marker's location
  popupAnchor: [0, -38], // Point from which the popup should open relative to the iconAnchor
  // Path to your shadow image (optional)
  shadowSize: [50, 64], // Size of the shadow (optional)
  shadowAnchor: [15, 64], // Point of the shadow corresponding to the marker's location (optional)
});

export default function MapView({
  markers,
}: {
  markers: { id: string; lat: number; lng: number; title?: string }[];
}) {
  // If no markers, fall back to Mumbai coords
  const center: [number, number] = markers.length
    ? [markers[0].lat, markers[0].lng]
    : [19.076, 72.8777];

  return (
    <div className="h-72">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]} icon={customIcon}>
            <Popup>{m.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
