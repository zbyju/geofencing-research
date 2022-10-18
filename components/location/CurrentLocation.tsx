import {
  Heading,
  ListItem,
  UnorderedList,
  Text,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Divider,
  Center,
  Flex,
} from "@chakra-ui/react";
import type { GeoLocationMeasured3D } from "../../types/location";

interface Props {
  location?: GeoLocationMeasured3D;
}

const CurrentLocation = ({ location }: Props) => {
  return (
    <>
      {location ? (
        <Flex
          my={3}
          px={5}
          py={2}
          direction="row"
          justify="space-between"
          align="center"
          wrap="wrap"
          overflowX="scroll"
          w="100%"
          shadow="md"
          gap="10px"
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
            <StatNumber>
              {location.accuracy?.toFixed(2) || "Unknown"}
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Accuracy altitude</StatLabel>
            <StatNumber>
              {location.accuracyAlt?.toFixed(2) || "Unknown"}
            </StatNumber>
          </Stat>
        </Flex>
      ) : (
        <Text>Unknown location</Text>
      )}
    </>
  );
};

export default CurrentLocation;
