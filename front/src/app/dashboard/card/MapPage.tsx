import {useState} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import {LatLng} from "leaflet";

export function MapPage(props: MapPageProps) {
    return (
        <div className="map-container">
            <MapContainer style={{width: '100%', height: "700px", zIndex: 1}} center={props.position} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={props.position}/>
            </MapContainer>
        </div>

    )
}

interface MapPageProps {
    position: { lng: number, lat: number }
}
