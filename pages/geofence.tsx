import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import GeofenceMap from "../components/map/GeofenceMap";
import type { Maybe } from "../types/generic.types";
import type {
  GeoLocation,
  GeoLocationMeasured3D,
} from "../types/location.types";

const Accuracy: NextPage = () => {
  const [location, setLocation] =
    useState<Maybe<GeoLocationMeasured3D>>(undefined);
  const [_, setManualLocation] = useState<Maybe<GeoLocation>>(undefined);

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
    setManualLocation({ ...location });
  }

  return (
    <Box w="100%">
      <Flex direction="column">
        <GeofenceMap
          userLocation={location}
          geofence={undefined}
          onClick={handleMapClick}
        />
      </Flex>
    </Box>
  );
};

export default Accuracy;
