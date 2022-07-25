import * as React from "react";
import {MutableRefObject, useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {useAppSelector} from "lib/store";
import {useDispatch} from "react-redux";
import {patchListPage} from "state/page/list";
import {getPayloadProps} from "lib/store/reducer";
import {MapLoader} from "lib/map";

const Body = styled(Box)(({theme})=>({
    position: 'sticky',
    top: "5rem",
    width:"35vw",
    height: "55rem",
    display: "flex",
    backgroundColor: 'white',
    borderRadius: "2rem",
}))

interface MapProps {
    mapRef: MutableRefObject<HTMLDivElement | undefined >
}

const Map = ({mapRef}: MapProps) => {
    const state = useAppSelector(state=> state.list_page);
    const dispatch = useDispatch();

    useEffect(() => {
        if (state.googleMap) {
            google.maps.event.clearListeners(state.googleMap, "idle")
            state.googleMap.addListener("idle", () => {
                onIdle(state.googleMap)
            });
        }
    }, [state.googleMap]);

    function onIdle (_map: google.maps.Map) {
        const mapCenter = _map?.getCenter()
        if(mapCenter){
            dispatch(patchListPage(getPayloadProps(
                "map", {
                    lat: mapCenter.toJSON().lat,
                    lng: mapCenter.toJSON().lng
                }
            )))
        }
    };

    return (
        <Body>
            <Box ref={mapRef} sx={{width:"40vw", height: "55rem", borderRadius: "2rem"}} >
                {(state.googleMap && state.list)&& state.list.map((item:any) => (
                    <Marker
                        key={item.id}
                        options={{
                            position: {
                                lat: item.latitude,
                                lng: item.longitude
                            },
                            map: state.googleMap
                        }}
                    />
                ))}
            </Box>
        </Body>
    );
};

type MarkerProps = {
    options: google.maps.MarkerOptions
}

const Marker: React.FC<MarkerProps> = ({options}) => {
    const [marker, setMarker] = useState<google.maps.Marker>();

    useEffect(() => {
        MapLoader.deleteScript()
        if(!marker){
            MapLoader.load().then((google) => {
                setMarker(new google.maps.Marker());
            })}
        MapLoader.deleteScript()
    }, []);

    useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker, options]);

    return null;
};

export default Map;

