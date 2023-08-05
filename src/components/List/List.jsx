import React, {createRef, useEffect, useRef, useState} from "react";
import {Grid, Typography, InputLabel, MenuItem, FormControl, Select} from "@mui/material";
import "./List.css";
import Place_Details from "../Place_Details/Place_Details";
import ReactLoading from "react-loading";

const List = ({places, Child_click, Loading_data, Type, setType, Rating, setRating}) => {

    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((refs) => Array(places.length).fill().map((_, index) => refs[index] || createRef()));
    }, [places]);

    return(
        <div className={"app__list-container"}>
            <Typography variant="h4">
                Restaurants, Hotels & Attractions around You
            </Typography>
            {
                Loading_data ? (
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
                    ) : (
            <>
                <FormControl className={"app__list-formcontrol"}>
                    <InputLabel>Type</InputLabel>
                    <Select value={Type} onChange={(e) => {
                        setType(e.target.value);
                    }}>
                        <MenuItem value={"restaurants"}>Restaurants</MenuItem>
                        <MenuItem value={"hotels"}>Hotels</MenuItem>
                        <MenuItem value={"attractions"}>Attractions</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={"app__list-formcontrol"}>
                    <InputLabel>Rating</InputLabel>
                    <Select value={Rating} onChange={(e) => {
                    setRating(e.target.value);
                    }}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                    </Select>
                </FormControl>
                <Grid container spacing={3} className={"app__list-list"}>
                {
                    places.map((place, index) => {
                        if (place.name){
                            return(
                            <Grid item key={index} xs={12} ref={elRefs[index]}>
                                <Place_Details
                                place={place}
                                selected = {Child_click === index}
                                refProp = {elRefs[index]}
                                />
                            </Grid>
                            )}
                })}
                </Grid>
            </>)}
        </div>
    );
}

export default List