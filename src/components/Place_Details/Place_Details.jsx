import React from "react";
import {Box, Typography, Button, Card, CardActions, CardMedia, CardContent, Rating, Chip} from "@mui/material"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

import "./Place_Details.css";
import {restaurant_image} from "../../constants/images";

const Place_Details = ({place, selected, refProp}) => {
    const {name, photo, rating, num_reviews, price_level, ranking, awards, cuisine, address, phone, web_url, website} = place;

    if (selected) {
        // console.log(refProp);
        refProp?.current?.scrollIntoView({
            behavior : "smooth",
            block : "start"
        });
    };
    return(
        <Card elevation={6}>
            <CardMedia
                style={{height : 350}}
                image={photo? photo.images.large.url : restaurant_image}
                title={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {name}
                </Typography>
                <Box display="flex" justifyContent="space-between">
                    <Rating value={Number(rating)} readOnly/>
                    <Typography gutterBottom variant="subtitle1">out of {num_reviews} reviews</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">{price_level}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{ranking}</Typography>
                </Box>
                {awards?.map((award) => (
                    <Box my={1} display="flex" justifyContent="space-between">
                        <img src={award.images.small} alt={award.display_name}/>
                        <Typography variant="subtitle2" color="textSecondary">
                            {award.display_name}
                        </Typography>
                    </Box>
                ))}
                {cuisine?.map(({name}) => (
                        <Chip key={name} size="small" label={name} className={"app__placedetail-chip"}/>
                ))}
                {address && (
                    <Typography gutterBottom variant="subtitle2" color="textSecondary" className={"app__placedetail-subtitle"}>
                        <LocationOnIcon />
                        {address}
                    </Typography>
                )}
                {phone && (
                    <Typography gutterBottom variant="subtitle2" color="textSecondary" className={"app__placedetail-subtitle"}>
                        <PhoneIcon />
                        {phone}
                    </Typography>
                )}
                <CardActions>
                    <Button size="small" color="primary" onClick={() => window.open(web_url, "_blank")}>
                        Trip Advisor
                    </Button>
                    <Button size="small" color="primary" onClick={() => window.open(website, "_blank")}>
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default Place_Details