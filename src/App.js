import React, {useEffect, useState} from "react";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import ReactLoading from "react-loading";
import { CssBaseline, Grid } from "@mui/material";
import {get_PlacesData} from "./api/api";
import {set_Map_center, Use_Map_Dispatch, Use_Map_State} from "./reducer/map_context";


const App = (props) => {
    
    const dispatch = Use_Map_Dispatch();
    const state = Use_Map_State();

    const center = state.map_center;
    const bounds = state.map_bounds;
    const selected_location = state.selected_location
    
    
    const [Places, setPlaces] = useState([]);
    const [Filtered_places, setFiltered_places] = useState([]);
    const [Wait, setWait] = useState(true);
    const [Loading_data, setLoading_data] = useState(false);

    const [Child_clicked, setChild_clicked] = useState(null);

    const [Type, setType] = useState("restaurants");
    const [Rating, setRating] = useState(0);

    useEffect( () => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            // console.log(latitude, longitude)
            // setCoordinates({lat : latitude, lng: longitude});
            set_Map_center(dispatch, {lat : latitude, lng: longitude});
            setWait(false);
        }, (error) => {
            console.log(error.message);
            // setCoordinates({lat : 35.68928311898838, lng:  51.38939611843311});
            set_Map_center(dispatch, {lat : 35.68, lng: 51.389});
            setWait(false);
        })
    }, []);

    useEffect(() => {
        const filtered_places = Places.filter(({rating}) => rating > Rating);
        setFiltered_places(filtered_places);
    }, [Rating]);


    useEffect(() => {
        setLoading_data(true);
        get_PlacesData(Type, bounds.sw, bounds.ne)
            .then((data)=> {
                setPlaces(data);
                setFiltered_places([]);
                setRating(0);
                setLoading_data(false);
            }).catch((error) => {
                console.log(error.message);
                setLoading_data(false);
        });
    }, [Type, center, bounds, selected_location]);


    return(
        <>
            <CssBaseline/>
            <Header/>
            <Grid container spacing={3} flexDirection={"row"}>
                <Grid item xs={12} md={4} overflow={"hidden"}>
                    <List
                        places={Filtered_places.length ? Filtered_places : Places}
                        Child_click={Child_clicked}
                        Loading_data = {Loading_data}
                        Type = {Type}
                        setType = {setType}
                        Rating = {Rating}
                        setRating = {setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8} padding={"0 1.5rem"}>
                    {
                        Wait ? (
                            <div style={{
                                width : "100%",
                                height : "100vh",
                                display : "flex",
                                justifyContent : "center",
                                alignItems : "center",
                            }}>
                                <ReactLoading
                                    color={"#1769aa"}
                                    type={"bars"}
                                />
                            </div>
                        ) :
                        (<Map
                            places = {Filtered_places.length ? Filtered_places : Places}
                            Child_click = {setChild_clicked}
                            Type = {Type}
                        />)
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default App