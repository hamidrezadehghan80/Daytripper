import React from 'react';
import {createRoot} from 'react-dom/client';
import App from "./App";
import "./index.css";
import {Map_provider} from "./reducer/map_context";

const root = createRoot(document.getElementById("root"));
root.render(
    <Map_provider>
        <App/>
    </Map_provider>
);