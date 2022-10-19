import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import CurrentLocation from "../components/location/CurrentLocation";
import ManualLocation from "../components/location/ManualLocation";
import Map from "../components/map/Map";
import AccuracyStatistics from "../components/statistics/AccuracyStatistics";
import type { Maybe } from "../types/generic";
import type {
  GeoLocation,
  GeoLocation3D,
  GeoLocationMeasured3D,
  LocationPin,
  LocationPins,
} from "../types/location";

const Accuracy: NextPage = () => {
  const [location, setLocation] =
    useState<Maybe<GeoLocationMeasured3D>>(undefined);
  const [manualLocation, setManualLocation] =
    useState<Maybe<GeoLocation3D>>(undefined);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            alt: position.coords.altitude || undefined,
            accuracy: position.coords.accuracy,
            accuracyAlt: position.coords.altitudeAccuracy || undefined,
          });
        },
        (error) => {
          alert(error.message);
        },
        { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      console.log("Geo not available");
    }
  }, []);

  function handleMapClick(location: GeoLocation) {
    setManualLocation({ ...location, alt: undefined });
  }

  return (
    <Box w="100%">
      <Flex direction="column">
        <Map
          userLocation={location}
          manualLocation={manualLocation}
          onClick={handleMapClick}
        />
        <Box px={10}>
          <CurrentLocation location={location} />
          <AccuracyStatistics />
          <ManualLocation location={manualLocation} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Accuracy;
