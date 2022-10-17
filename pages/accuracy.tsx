import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import CurrentLocation from "../components/location/CurrentLocation";
import Map from "../components/map/Map";
import AccuracyStatistics from "../components/statistics/AccuracyStatistics";

const Accuracy: NextPage = () => {
  return (
    <Box w="100%">
      <Flex direction="column">
        <Map />
        <Box px={10}>
          <CurrentLocation />
          <AccuracyStatistics />
        </Box>
      </Flex>
    </Box>
  );
};

export default Accuracy;
