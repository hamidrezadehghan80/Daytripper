import {createContext, useContext, useReducer} from "react";

var Map_state_context = createContext();
var Map_dispatch_context = createContext();

function Map_reducer(state, action) {
    switch (action.type) {
        case "SET_Center" : {
            return {...state, map_center : action.payload};
        }
        case "SET_Bounds" : {
            return {...state, map_bounds : action.payload};
        }
        case "SET_Location": {
            return {...state, selected_location : action.payload};
        }
        default:{
            throw new Error("unhandled action type");
        }
    }
}

function Map_provider({children}) {
    const [state, dispatch] = useReducer(Map_reducer, {
        map_center : {
            lat : 0,
            lng : 0
        },
        selected_location : {
            lat : 0,
            lng : 0
        },
        map_bounds : {
            ne : {
                lat : 0,
                lng : 0
            },
            sw : {
                lat : 0,
                lng : 0
            }
        }
    });

    return(
        <Map_state_context.Provider value={state}>
            <Map_dispatch_context.Provider value={dispatch}>
                {children}
            </Map_dispatch_context.Provider>
        </Map_state_context.Provider>
    );
}

function Use_Map_State() {
    let map_state = useContext(Map_state_context);
    if (map_state === undefined){
        throw new Error("useMapState must be use within a TweetProvider");
    }
    return map_state;
}

function Use_Map_Dispatch() {
    let map_dispatch = useContext(Map_dispatch_context);
    if (map_dispatch === undefined){
        throw new Error("useMapDispatch must be use within a TweetProvider");
    }
    return map_dispatch;
}

function set_Map_center(dispatch, map_center) {
    dispatch({
        type : "SET_Center",
        payload : map_center
    });
};

function set_Selected_location(dispatch, location) {
    dispatch({
        type : "SET_Location",
        payload : location
    });
};

function set_Map_bounds(dispatch, map_bounds) {
    dispatch({
        type : "SET_Bounds",
        payload : map_bounds
    })
};

export {
    Map_provider,
    set_Map_center,
    set_Map_bounds,
    set_Selected_location,
    Use_Map_State,
    Use_Map_Dispatch,
};