import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Heading } from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import config from "../../config.json";
import { GeoLocation, LocationPin } from "../../types/location";

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

  useEffect(() => {
    if (pins.length > 0) {
      changeCenter(pins[0]);
    }
  }, [pins]);

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
