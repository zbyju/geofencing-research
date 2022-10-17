import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Heading } from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";
import { ErrorBoundary } from "react-error-boundary";

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
  const defaultProps = {
    center: {
      lat: 60.172059,
      lng: 24.945831,
    },
    zoom: 12,
  };
  return (
    <>
      <ErrorBoundary FallbackComponent={MapErrorFallback}>
        <Box w="100%" h="40vh" shadow="md">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <Marker lat={60.172059} lng={24.945831} />
          </GoogleMapReact>
        </Box>
      </ErrorBoundary>
    </>
  );
};

export default Map;
