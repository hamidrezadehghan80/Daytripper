import axios from "axios";

export const get_PlacesData = async (Type, sw, ne) =>{
    try {
        const options = {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };

        const {data : {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${Type}/list-in-boundary`
            , options);
        return data;
    }catch (error){
        console.log(error.message);
    }
}
