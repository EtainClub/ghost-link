'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons in Next.js
const iconUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface Node {
    id: string;
    name: string;
    coordinates: [number, number];
    status: 'online' | 'congested' | 'offline';
    tasks: number;
    latency: string;
    type: string;
}

const nodes: Node[] = [
    { id: "NYC-01", name: "New York", coordinates: [40.7128, -74.006], status: 'online', tasks: 1240, latency: '12ms', type: 'Relay Hub' },
    { id: "LDN-02", name: "London", coordinates: [51.5074, -0.1276], status: 'online', tasks: 856, latency: '18ms', type: 'Processing Node' },
    { id: "SEL-03", name: "Seoul", coordinates: [37.5665, 126.978], status: 'online', tasks: 2103, latency: '8ms', type: 'Primary Core' },
    { id: "TKY-04", name: "Tokyo", coordinates: [35.6895, 139.6917], status: 'online', tasks: 1845, latency: '15ms', type: 'Relay Hub' },
    { id: "SYD-05", name: "Sydney", coordinates: [-33.8688, 151.2093], status: 'online', tasks: 432, latency: '45ms', type: 'Edge Node' },
    { id: "NBO-06", name: "Nairobi", coordinates: [-1.2921, 36.8219], status: 'congested', tasks: 312, latency: '124ms', type: 'Relay Hub' },
    { id: "SAO-07", name: "Sao Paulo", coordinates: [-23.5505, -46.6333], status: 'offline', tasks: 0, latency: '-', type: 'Standard Node' },
    { id: "BER-08", name: "Berlin", coordinates: [52.5200, 13.4050], status: 'online', tasks: 645, latency: '22ms', type: 'Processing Node' },
    { id: "SFO-09", name: "San Francisco", coordinates: [37.7749, -122.4194], status: 'online', tasks: 980, latency: '14ms', type: 'Primary Core' },
    { id: "SIN-10", name: "Singapore", coordinates: [1.3521, 103.8198], status: 'online', tasks: 1120, latency: '28ms', type: 'Relay Hub' },
];

const MapComponent = () => {
    return (
        <MapContainer
            center={[25, 10]}
            zoom={2}
            style={{ height: '100%', width: '100%', background: '#0a101a' }}
            scrollWheelZoom={false}
            minZoom={2}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {nodes.map((node) => (
                <Marker
                    key={node.id}
                    position={node.coordinates}
                    icon={customIcon}
                >
                    <Popup className="custom-popup">
                        <div className="p-1 min-w-[150px]">
                            <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-1">
                                <h3 className="font-bold text-sm text-gray-800">{node.name}</h3>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${node.status === 'online' ? 'bg-green-100 text-green-700' :
                                    node.status === 'congested' ? 'bg-orange-100 text-orange-700' :
                                        'bg-gray-100 text-gray-600'
                                    }`}>
                                    {node.status}
                                </span>
                            </div>
                            <div className="space-y-1 text-xs text-gray-600">
                                <div className="flex justify-between">
                                    <span>Type:</span>
                                    <span className="font-mono">{node.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tasks:</span>
                                    <span className="font-mono font-bold">{node.tasks.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Latency:</span>
                                    <span className={`font-mono ${node.status === 'congested' ? 'text-orange-600' : 'text-green-600'}`}>
                                        {node.latency}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
