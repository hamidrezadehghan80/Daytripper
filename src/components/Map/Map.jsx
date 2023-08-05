import React, {useEffect, useRef, useState} from "react";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import {useMap, useMapEvents} from 'react-leaflet/hooks'
import {Marker, Popup} from "react-leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet"
import {
    attraction_marker,
    hotel_marker,
    location_marker,
    restaurant_image,
    restaurant_marker
} from "../../constants/images";
import {Paper, Rating, Typography, useMediaQuery} from "@mui/material";
import {set_Map_bounds, set_Map_center, Use_Map_Dispatch, Use_Map_State} from "../../reducer/map_context";


const Map = ({places, Child_click, Type}) => {

    const dispatch = Use_Map_Dispatch();
    const state = Use_Map_State()

    const center = state.map_center;
    const selected_location  = state.selected_location;

    const is_Mobile = useMediaQuery("(max-width:600px)");

    const restaurant_marker_i = L.icon({
        iconUrl : restaurant_marker,
        iconSize : [28, 28]
    });

    const hotel_icon = L.icon({
        iconUrl : hotel_marker,
        iconSize : [28, 28]
    });

    const attraction_icon = L.icon({
        iconUrl : attraction_marker,
        iconSize : [28, 28]
    });

    let icon = "";

    if (Type === "restaurants") {
        icon = restaurant_marker_i;
    }
    else if (Type === "hotels") {
        icon = hotel_icon;
    }
    else {
        icon = attraction_icon
    }

    const LocationMarker = () => {

        const map = useMapEvents({
            moveend(){
                // console.log("center", map.getCenter());
                // console.log("bounds", map.getBounds());

                const {lat, lng} = map.getCenter();
                const {_northEast, _southWest} = map.getBounds();

                set_Map_center(dispatch, {lat : lat, lng : lng});
                set_Map_bounds(dispatch, {ne : _northEast , sw : _southWest});
            }
        });
    }

    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setView(
                [center.lat, center.lng],
                15,
                {
                    animate : true
                }
                );
            const {_northEast, _southWest} = mapRef.current.getBounds();
            set_Map_bounds(dispatch, {ne : _northEast , sw : _southWest});

        }
    }, [selected_location]);

    return(
        <MapContainer
            center={[center.lat, center.lng]}
            zoom={15}
            scrollWheelZoom={true}
            className={"app__map-map-container"}
            ref={mapRef}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=OLwPau5oBy3rma14VCUv"
                zIndex={2}
            />
            {
                places?.map(({name, latitude, longitude, photo, rating}, index) => {
                    if (latitude && longitude) {
                        return(
                            <Marker position={[Number(latitude), Number(longitude)]} icon={icon} key={index}>
                                <Popup>
                                    <div className={"app__map-marker-container"} key={index} onClick={() => Child_click(index)}>
                                        {
                                            is_Mobile ? (
                                                <p>{name}</p>
                                            ) : (
                                                <Paper elevation={3} className={"app__map-paper"}>
                                                    <Typography variant="subtitle2" gutterBottom>
                                                        {name}
                                                    </Typography>
                                                    <img
                                                        className={"app__map-pointer"}
                                                        src={photo? photo.images.large.url : restaurant_image}
                                                        alt={name}
                                                    />
                                                    <Rating size="small" value={Number(rating)} readOnly />
                                                </Paper>
                                            )
                                        }
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    }
            })
            }
            <LocationMarker/>
        </MapContainer>
    )
}

export default Map