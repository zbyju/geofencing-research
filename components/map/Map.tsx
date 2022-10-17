import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Heading } from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import config from "../../config.json";
import { GeoLocation } from "../../types/location";

interface AnyProps {
  text: string;
}

const Marker = ({ lat, lng }: any) => (
  <TriangleDownIcon color="red" ml="-20px" mt="-40px" boxSize="10" />
);

const MapErrorFallback = () => {
  return <Heading>There has been an error, when loading the map.</Heading>;
};

const Map = () => {
  const [map, setMap] = useState<any | null>(null);
  const defaultProps = {
    center: {
      lat: 60.172059,
      lng: 24.945831,
    },
    zoom: 12,
  };
  const apiIsLoaded = (map: any, maps: any) => setMap(map);
  const changeCenter = (location: GeoLocation) => {
    if (map === null) return;
    map.setCenter(location);
  };

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
            <Marker lat={60.172059} lng={24.945831} />
          </GoogleMapReact>
        </Box>
      </ErrorBoundary>
    </>
  );
};

export default Map;
