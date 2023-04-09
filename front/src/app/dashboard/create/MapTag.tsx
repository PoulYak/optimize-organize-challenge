import {Dialog, DialogTitle} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import {LatLng} from "leaflet";
import {MapContainer, Marker, TileLayer, useMapEvents} from "react-leaflet";

interface ClickableMarkerProps {
    position: LatLng | null,

    setPosition(position: LatLng): void
}

function ClickableMarker(props: ClickableMarkerProps) {
    useMapEvents({
        click(event) {
            props.setPosition(event.latlng)
        }
    })

    return (props.position && <Marker position={props.position} />)
}

export interface MapTagProps {
    open: boolean;

    onClose(position: LatLng | null): void;
}

export function MapTag(props: MapTagProps) {
    const [position, setPosition] = useState(null as (LatLng | null));

    return (<Dialog maxWidth="xl" open={props.open}>
        <div className="card-header">
            <div className="card-header-left">
                <p className="card-header-title">Выбор позиции</p>
            </div>
            <div className="card-header-right">
                <button className="close-button" onClick={() => props.onClose(position)}>
                    <FontAwesomeIcon icon={faX} size="xl"/>
                </button>
            </div>
        </div>
        <MapContainer style={{width: '1200px', height: "800px", zIndex: 1}} center={{
            lat: 55.558741,
            lng: 37.378847
        }} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickableMarker position={position} setPosition={setPosition}/>
        </MapContainer>
    </Dialog>)
}