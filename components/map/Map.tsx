import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Heading } from "@chakra-ui/react";
import GoogleMapReact, { ClickEventValue } from "google-map-react";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Maybe } from "../../types/generic";
import type {
  GeoLocation,
  GeoLocationMeasured,
  LocationPin,
  MapMarker,
} from "../../types/location";
import {
  isMarkerCorrect,
  isMarkerDrawn,
  locationToMarker,
} from "../../utils/map";

const Marker = ({ lat, lng, color }: any) => (
  <TriangleDownIcon color={color} ml="-20px" mt="-40px" boxSize="10" />
);

const MapErrorFallback = () => {
  return <Heading>There has been an error, when loading the map.</Heading>;
};

interface Props {
  userLocation: Maybe<GeoLocationMeasured>;
  manualLocation: Maybe<GeoLocation>;
  onClick: (location: GeoLocation) => any;
}

const Map = ({ userLocation, manualLocation, onClick }: Props) => {
  const [userMarker, setUserMarker] = useState<Maybe<MapMarker>>(undefined);
  const [manualMarker, setManualMarker] = useState<Maybe<MapMarker>>(undefined);
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
    googleMaps.map.setCenter(location);
  };

  useEffect(() => {
    if (googleMaps.map && googleMaps.maps && userLocation) {
      if (userMarker?.accuracyCircle !== undefined)
        userMarker.accuracyCircle.setMap(null);
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
  }, [userLocation, googleMaps]);

  useEffect(() => {
    if (manualLocation === undefined) return setManualMarker(undefined);
    setManualMarker({
      pin: {
        ...manualLocation,
        color: "purple",
      },
    });
  }, [manualLocation]);

  function handleClick(e: ClickEventValue) {
    onClick({
      lat: e.lat,
      lng: e.lng,
    });
  }

  return (
    <>
      <ErrorBoundary FallbackComponent={MapErrorFallback}>
        <Box w="100%" h="40vh" shadow="md">
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
            {manualMarker?.pin !== undefined && (
              <Marker
                lat={manualMarker.pin.lat}
                lng={manualMarker.pin.lng}
                color={manualMarker.pin.color}
              />
            )}
          </GoogleMapReact>
        </Box>
      </ErrorBoundary>
    </>
  );
};

export default Map;
