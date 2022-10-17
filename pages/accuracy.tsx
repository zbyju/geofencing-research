import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import CurrentLocation from "../components/location/CurrentLocation";
import Map from "../components/map/Map";
import AccuracyStatistics from "../components/statistics/AccuracyStatistics";
import { Maybe } from "../types/generic";
import { GeoLocationMeasured3D, LocationPin } from "../types/location";

const Accuracy: NextPage = () => {
  const [location, setLocation] =
    useState<Maybe<GeoLocationMeasured3D>>(undefined);
  const [pins, setPins] = useState<LocationPin[]>([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            alt: position.coords.altitude,
            accuracy: position.coords.accuracy,
            accuracyAlt: position.coords.altitudeAccuracy,
          });
          setPins(
            pins.concat({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              color: "purple",
            })
          );
        },
        (error) => {
          alert(error.message);
        }
      );
    } else {
      console.log("Geo not available");
    }
  }, []);

  return (
    <Box w="100%">
      <Flex direction="column">
        <Map pins={pins} />
        <Box px={10}>
          <CurrentLocation location={location} />
          <AccuracyStatistics />
        </Box>
      </Flex>
    </Box>
  );
};

export default Accuracy;
