import { Flex, Box, Heading, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { GeoLocation } from "../../types/location.types";
import { GeofenceTimes } from "../../types/times.types";
import { calculateDuration, calculatePathDistance } from "../../utils/statistics";

interface Props {
  userPath: GeoLocation[];
  times: GeofenceTimes;
}

const GeofenceStatistics = ({ userPath, times }: Props) => {
  const stats = {
    distance: calculatePathDistance(userPath),
    time: calculateDuration(times),
  };

  const entry = userPath.length > 0 ? userPath[0] : undefined;
  const exit = userPath.length > 0 ? userPath[userPath.length - 1] : undefined;

  return (
    <Box my={3} shadow="md" w="100%" borderRadius="8px" overflow="hidden">
      <Heading px={5} py={2} size="md" bg="blue.100">
        Statistics
      </Heading>
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        wrap="wrap"
        overflowX="scroll"
        gap="10px"
        px={5}
        py={2}
      >
        <Stat>
          <StatLabel>Distance</StatLabel>
          <StatNumber>{stats.distance ? `${stats.distance?.toFixed(2)}m` : "Unknown"}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Time inside</StatLabel>
          <StatNumber>
            {stats.time ? `${stats.time.toFixed(2)}s` : times.start ? "Inside" : "Unknown"}
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Entry latitude</StatLabel>
          <StatNumber>{entry !== undefined ? entry.lat : "Undefined"}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Entry longitude</StatLabel>
          <StatNumber>{entry !== undefined ? entry.lng : "Undefined"}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Exit latitude</StatLabel>
          <StatNumber>{exit !== undefined ? exit.lat : "Undefined"}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Exit longitude</StatLabel>
          <StatNumber>{exit !== undefined ? exit.lng : "Undefined"}</StatNumber>
        </Stat>
      </Flex>
    </Box>
  );
};

export default GeofenceStatistics;
