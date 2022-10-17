import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import CurrentLocation from "../components/location/CurrentLocation";
import Map from "../components/map/Map";
import AccuracyStatistics from "../components/statistics/AccuracyStatistics";

const Accuracy: NextPage = () => {
  return (
    <Box w="100%" py={5}>
      <Flex direction="column">
        <Map />
        <CurrentLocation />
        <AccuracyStatistics />
      </Flex>
    </Box>
  );
};

export default Accuracy;
