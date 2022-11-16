import {
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Box,
  Button,
  Icon,
} from "@chakra-ui/react";
import type { GeoLocationMeasured3D } from "../../types/location.types";
import { GrFormRefresh } from "react-icons/gr";

interface Props {
  location?: GeoLocationMeasured3D;
  onLocationRefresh?: () => any;
}

const CurrentLocation = ({ location, onLocationRefresh }: Props) => {
  return (
    <Box my={3} shadow="md" borderRadius="8px" overflow="hidden">
      <Heading px={5} py={2} size="md" bg="red.100">
        Current location
      </Heading>
      {location ? (
        <Flex
          direction="row"
          justify="space-between"
          align="center"
          wrap="wrap"
          overflowX="scroll"
          w="100%"
          gap="10px"
          px={5}
          py={2}
        >
          <Stat>
            <StatLabel>Latitude</StatLabel>
            <StatNumber>{location.lat}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Longitude</StatLabel>
            <StatNumber>{location.lng}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Altitude</StatLabel>
            <StatNumber>{location.alt || "Unknown"}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Accuracy</StatLabel>
            <StatNumber>{location.accuracy?.toFixed(2) || "Unknown"}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Accuracy altitude</StatLabel>
            <StatNumber>{location.accuracyAlt?.toFixed(2) || "Unknown"}</StatNumber>
          </Stat>
        </Flex>
      ) : (
        <Text>Unknown location</Text>
      )}
      <Flex direction="row" wrap="wrap" px={5} py={2}>
        <Button onClick={onLocationRefresh} leftIcon={<Icon as={GrFormRefresh} w={5} h={5} />}>
          Refresh
        </Button>
      </Flex>
    </Box>
  );
};

export default CurrentLocation;
