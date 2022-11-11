import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import CurrentLocation from "../components/location/CurrentLocation";
import ManualLocation from "../components/location/ManualLocation";
import LocationMap from "../components/map/LocationMap";
import AccuracyStatistics from "../components/statistics/AccuracyStatistics";
import type { Maybe } from "../types/generic.types";
import type {
  GeoLocation,
  GeoLocationMeasured3D,
  ManualGeoLocation3D,
} from "../types/location.types";

const Accuracy: NextPage = () => {
  const [location, setLocation] =
    useState<Maybe<GeoLocationMeasured3D>>(undefined);
  const [manualLocation, setManualLocation] = useState<ManualGeoLocation3D>({
    lat: undefined,
    lng: undefined,
    alt: undefined,
  });

  const refreshLocation = () => {
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
  };

  useEffect(() => {
    refreshLocation();
  }, []);

  function handleMapClick(location: GeoLocation) {
    setManualLocation({ ...location, alt: undefined });
  }

  function handleManualLocationChangeLat(lat: number) {
    setManualLocation({ ...manualLocation, lat });
  }
  function handleManualLocationChangeLng(lng: number) {
    setManualLocation({ ...manualLocation, lng });
  }
  function handleManualLocationChangeAlt(alt: number) {
    setManualLocation({ ...manualLocation, alt });
  }

  return (
    <Box w="100%">
      <Flex direction="column">
        <LocationMap
          userLocation={location}
          manualLocation={manualLocation}
          onClick={handleMapClick}
        />
        <Box px={10}>
          <CurrentLocation
            location={location}
            onLocationRefresh={refreshLocation}
          />
          <ManualLocation
            location={manualLocation}
            onChangeLat={handleManualLocationChangeLat}
            onChangeLng={handleManualLocationChangeLng}
            onChangeAlt={handleManualLocationChangeAlt}
          />
          <AccuracyStatistics
            userLocation={location}
            manualLocation={manualLocation}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Accuracy;
