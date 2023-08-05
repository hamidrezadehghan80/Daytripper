import React, {useEffect, useState} from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import "./Header.css";
import PlaceIcon from '@mui/icons-material/Place';
import {set_Map_center, set_Selected_location, Use_Map_Dispatch, Use_Map_State} from "../../reducer/map_context";
import {logo} from "../../constants/images";




const Header = () => {

    const dispatch = Use_Map_Dispatch();
    const state = Use_Map_State();

    const [search_text, setSearch_text] = useState("");
    const [searched_places, setSearched_places] = useState([]);

    const Nominatim_base_url = "https://nominatim.openstreetmap.org/search?";

    const params = {
        q : search_text,
        format : "json",
        address_details : 1,
        polygan_geojson : 0
    };

    const queryString = new URLSearchParams(params).toString();
    const requset_options = {
        method : "GET",
        redirect : "follow"
    }

    useEffect(() => {
        fetch(`${Nominatim_base_url}${queryString}`, requset_options)
            .then((response) => response.text())
            .then((result) => {
                let data = JSON.parse(result);
                setSearched_places(data);
            })
            .catch((error) => console.log(error));


    }, [search_text]);


    const handle_click = (index) => {
        const {lat , lon} = searched_places[index];
        // console.log(lat, lon);
        set_Map_center(dispatch, {lat : lat, lng : lon});
        set_Selected_location(dispatch, {lat : lat, lng : lon});
        setSearched_places([])
    };

    return(
        <AppBar position={"static"} className={"app__header-appbar"}>
            <Toolbar className={"app__header-toolbar"}>
                <Typography variant="h5" className={"app__header-title"}>
                    Daytripper
                </Typography>
                <div className={"app__header-logo"}>
                    <img src={logo} alt={"logo"}/>
                </div>
                <Box className={"app__header-box"} display={"flex"} width={"40%"}>
                    <Typography variant="h6" className={"app__header-title"}>
                        Explore new places
                    </Typography>
                    {/*<Autocomplete onLoad={onload} onPlaceChanged={on_place_changed}>*/}
                        <div className={"app__header-search"}>
                            <div className={"app__header-search-icon"}>
                                <SearchIcon/>
                            </div>
                            <input value={search_text} placeholder={"Search..."} onChange={(e) => setSearch_text(e.target.value)}/>
                            <div className={"app__header-search-result-list"}>
                                <ul>
                                    {
                                        searched_places?.map(({display_name}, index) => {
                                            return(
                                                <li
                                                    className={"app__header-searched-place"}
                                                    key={index}
                                                    onClick={() => handle_click(index)}
                                                >
                                                    <PlaceIcon/>
                                                    <p>{display_name}</p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header