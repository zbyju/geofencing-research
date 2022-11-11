import { TriangleDownIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Icon,
  Switch,
} from "@chakra-ui/react";
import GoogleMapReact, { ClickEventValue } from "google-map-react";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Maybe } from "../../types/generic.types";
import type {
  GeoLocation,
  GeoLocationMeasured,
  ManualGeoLocation,
  MapMarker,
} from "../../types/location.types";
import { isNumeric } from "../../utils/typeChecking";

// eslint-disable-next-line unused-imports/no-unused-vars
const Marker = ({ lat, lng, color }: any) => (
  <TriangleDownIcon color={color} ml="-20px" mt="-40px" boxSize="10" />
);

const MapErrorFallback = () => {
  return <Heading>There has been an error, when loading the map.</Heading>;
};

interface Props {
  userLocation: Maybe<GeoLocationMeasured>;
  manualLocation: ManualGeoLocation;
  // eslint-disable-next-line unused-imports/no-unused-vars
  onClick: (location: GeoLocation) => any;
}

const LocationMap = ({ userLocation, manualLocation, onClick }: Props) => {
  const [userMarker, setUserMarker] = useState<Maybe<MapMarker>>(undefined);
  const [manualMarker, setManualMarker] = useState<Maybe<MapMarker>>(undefined);
  const [googleMaps, setGoogleMaps] = useState<any | null>({
    map: undefined,
    maps: undefined,
  });
  const [shouldChangeCenter, setShouldChangeCenter] = useState<boolean>(true);
  const [shouldShowMarkers, setShouldShowMarkers] = useState<boolean>(true);

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

  // Change center of the map to the location in @param
  const changeCenter = (location: GeoLocation) => {
    if (googleMaps.map === undefined) return;
    googleMaps.map.setCenter(location);
  };

  // Centers map when user location changes
  // Updates user marker and accuracy circle when location changes
  useEffect(() => {
    if (googleMaps.map && googleMaps.maps && userLocation) {
      if (shouldChangeCenter && userLocation !== undefined) {
        changeCenter(userLocation);
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation, googleMaps]);

  // Updates manual location marker
  useEffect(() => {
    if (isNumeric(manualLocation.lat) && isNumeric(manualLocation.lng)) {
      setManualMarker({
        pin: {
          lat: manualLocation.lat,
          lng: manualLocation.lng,
          color: "purple",
        },
      });
    }
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
            {shouldShowMarkers && userMarker?.pin !== undefined && (
              <Marker
                lat={userMarker.pin.lat}
                lng={userMarker.pin.lng}
                color={userMarker.pin.color}
              />
            )}
            {shouldShowMarkers && manualMarker?.pin !== undefined && (
              <Marker
                lat={manualMarker.pin.lat}
                lng={manualMarker.pin.lng}
                color={manualMarker.pin.color}
              />
            )}
          </GoogleMapReact>
        </Box>
        <Flex px={3} py={1} direction="row" wrap="wrap" shadow="md">
          <Button
            size="sm"
            onClick={() => setShouldShowMarkers(!shouldShowMarkers)}
            leftIcon={<Icon as={shouldShowMarkers ? ViewOffIcon : ViewIcon} />}
          >
            {shouldShowMarkers ? "Hide markers" : "Show markers"}
          </Button>

          <FormLabel htmlFor="email-alerts" mb="0" alignSelf="center" ml={3}>
            Recenter on change?
          </FormLabel>
          <Switch
            id="email-alerts"
            alignSelf="center"
            isChecked={shouldChangeCenter}
            onChange={() => setShouldChangeCenter(!shouldChangeCenter)}
          />
        </Flex>
      </ErrorBoundary>
    </>
  );
};

export default LocationMap;
