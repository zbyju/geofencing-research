import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Heading } from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import config from "../../config.json";
import type { GeoLocation, LocationPin } from "../../types/location";

interface AnyProps {
  text: string;
}

const Marker = ({ lat, lng, color }: any) => (
  <TriangleDownIcon color={color} ml="-20px" mt="-40px" boxSize="10" />
);

const MapErrorFallback = () => {
  return <Heading>There has been an error, when loading the map.</Heading>;
};

interface Props {
  pins: LocationPin[];
}

const Map = ({ pins }: Props) => {
  const [markers, setMarkers] = useState<any>([]);
  const [googleMaps, setGoogleMaps] = useState<any | null>({
    map: undefined,
    maps: undefined,
  });
  const defaultProps = {
    center: {
      lat: 60.172059,
      lng: 24.945831,
    },
    zoom: 12,
  };
  const apiIsLoaded = (map: any, maps: any) => {
    setGoogleMaps({ map, maps });
  };
  const changeCenter = (location: GeoLocation) => {
    if (googleMaps.map === undefined) return;
    console.log(googleMaps.map);
    googleMaps.map.setCenter(location);
  };

  useEffect(() => {
    if (googleMaps.map && googleMaps.maps) {
      setMarkers(
        pins.map((p) => {
          return {
            pin: p,
            accuracyCircle: new googleMaps.maps.Circle({
              strokeColor: p.color,
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: p.color,
              fillOpacity: 0.35,
              map: googleMaps.map,
              center: { lat: p.lat, lng: p.lng },
              radius: p.accuracy || 0.01,
            }),
          };
        })
      );
    }
    if (pins.length > 0) {
      changeCenter(pins[0]);
    }
  }, [pins, googleMaps]);

  return (
    <>
      <ErrorBoundary FallbackComponent={MapErrorFallback}>
        <Box w="100%" h="40vh" shadow="md">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: config.GOOGLE_MAPS_API_KEY,
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
          >
            {pins.map((p) => (
              <Marker key={p.lat.toString() + p.lng.toString()} {...p} />
            ))}
          </GoogleMapReact>
        </Box>
      </ErrorBoundary>
    </>
  );
};

export default Map;
