import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  StatHelpText,
  Box,
  Heading,
} from "@chakra-ui/react";
import { Maybe } from "../../types/generic.types";
import { GeoLocation3D, ManualGeoLocation3D } from "../../types/location.types";
import { StatsError } from "../../types/statistics.types";
import {
  calculateDistance,
  calculateDistance3D,
  calculateError,
} from "../../utils/statistics";

interface Props {
  userLocation: Maybe<GeoLocation3D>;
  manualLocation: ManualGeoLocation3D;
}

const AccuracyStatistics = ({ userLocation, manualLocation }: Props) => {
  const stats =
    userLocation !== undefined
      ? {
          errors: {
            lat: calculateError(userLocation.lat, manualLocation.lat),
            lng: calculateError(userLocation.lng, manualLocation.lng),
            alt: calculateError(userLocation.alt, manualLocation.alt),
            distance: calculateDistance(userLocation, manualLocation),
            distance3D: calculateDistance3D(userLocation, manualLocation),
          },
        }
      : undefined;

  function makeErrorStatElement(s: StatsError | undefined, text: string) {
    if (s === undefined)
      return (
        <Stat key={text}>
          {text} error<StatNumber>Unknown</StatNumber>
        </Stat>
      );
    return (
      <Stat key={text}>
        <StatLabel>{text} error</StatLabel>
        <StatNumber>{s.absolute}</StatNumber>
        <StatHelpText>
          <StatArrow type={s.relative.type} />
          {s.relative.value}%
        </StatHelpText>
      </Stat>
    );
  }

  function makeDistanceStatElement(d: number | undefined, text: string) {
    if (d === undefined)
      return (
        <Stat key={text}>
          {text}
          <StatNumber>Unknown</StatNumber>
        </Stat>
      );
    return (
      <Stat key={text}>
        <StatLabel>{text}</StatLabel>
        <StatNumber>{d.toFixed(3)}m</StatNumber>
      </Stat>
    );
  }

  const statElements = [
    makeErrorStatElement(stats?.errors.lat, "Latitude"),
    makeErrorStatElement(stats?.errors.lng, "Longitude"),
    makeErrorStatElement(stats?.errors.alt, "Altitude"),
    makeDistanceStatElement(stats?.errors.distance, "Distance"),
    makeDistanceStatElement(stats?.errors.distance3D, "Distance 3D"),
  ];

  return (
    <Box my={3} shadow="md" w="100%" borderRadius="8px" overflow="hidden">
      <Heading px={5} py={2} size="md" bg="blue.100">
        Measurement statistics
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
        {statElements}
      </Flex>
    </Box>
  );
};

export default AccuracyStatistics;
