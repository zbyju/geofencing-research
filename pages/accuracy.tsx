import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import CurrentLocation from "../components/location/CurrentLocation";
import Map from "../components/map/Map";
import AccuracyStatistics from "../components/statistics/AccuracyStatistics";
import { Maybe } from "../types/generic";
import { GeoLocationMeasured3D } from "../types/location";

const Accuracy: NextPage = () => {
  const [location, setLocation] = useState<Maybe<GeoLocationMeasured3D>>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          accuracyAltitude: position.coords.altitudeAccuracy,
        });
      });
    } else {
      console.log("Geo not available");
    }
  }, []);

  return (
    <Box w="100%">
      <Flex direction="column">
        <Map />
        <Box px={10}>
          <CurrentLocation location={location} />
          <AccuracyStatistics />
        </Box>
      </Flex>
    </Box>
  );
};

export default Accuracy;
