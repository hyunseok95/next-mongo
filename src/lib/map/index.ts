import {Loader} from "@googlemaps/js-api-loader";
import {MAP_APIKEY} from "lib/env";

export const MapLoader = new Loader({
    apiKey: MAP_APIKEY,
    version: "weekly",
    libraries:["places"],
    retries: 0
});

