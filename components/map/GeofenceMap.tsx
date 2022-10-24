import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Heading } from "@chakra-ui/react";
import GoogleMapReact, { ClickEventValue } from "google-map-react";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Maybe } from "../../types/generic.types";
import { Geofence } from "../../types/geofence.types";
import type {
  GeoLocation,
  GeoLocationMeasured,
  MapMarker,
} from "../../types/location.types";

// eslint-disable-next-line unused-imports/no-unused-vars
const Marker = ({ lat, lng, color }: any) => (
  <TriangleDownIcon color={color} ml="-20px" mt="-40px" boxSize="10" />
);

const MapErrorFallback = () => {
  return <Heading>There has been an error, when loading the map.</Heading>;
};

interface Props {
  userLocation: Maybe<GeoLocationMeasured>;
  geofence: Maybe<Geofence>;
  // eslint-disable-next-line unused-imports/no-unused-vars
  onClick: (location: GeoLocation) => any;
}

const GeofenceMap = ({ userLocation, geofence, onClick }: Props) => {
  const [userMarker, setUserMarker] = useState<Maybe<MapMarker>>(undefined);
  const [googleMaps, setGoogleMaps] = useState<any | null>({
    map: undefined,
    maps: undefined,
  });

  // Default props for the map component
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

  // Centers map when user location changes
  // Updates user marker and accuracy circle when location changes
  useEffect(() => {
    if (googleMaps.map && googleMaps.maps && userLocation) {
      if (userMarker?.accuracyCircle !== undefined) {
        userMarker.accuracyCircle.setMap(null);
      }
      setUserMarker({
        pin: { ...userLocation, color: "red" },
        accuracyCircle:
          userLocation.accuracy !== undefined
            ? new googleMaps.maps.Circle({
                strokeColor: "red",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "red",
                fillOpacity: 0.35,
                map: googleMaps.map,
                center: { lat: userLocation.lat, lng: userLocation.lng },
                radius: userLocation.accuracy || 0.01,
              })
            : undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation, googleMaps]);

  function handleClick(e: ClickEventValue) {
    onClick({
      lat: e.lat,
      lng: e.lng,
    });
  }

  return (
    <>
      <ErrorBoundary FallbackComponent={MapErrorFallback}>
        <Box w="100%" h="40vh">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
            onClick={handleClick}
          >
            {userMarker?.pin !== undefined && (
              <Marker
                lat={userMarker.pin.lat}
                lng={userMarker.pin.lng}
                color={userMarker.pin.color}
              />
            )}
          </GoogleMapReact>
        </Box>
      </ErrorBoundary>
    </>
  );
};

export default GeofenceMap;
