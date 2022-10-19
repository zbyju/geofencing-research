import {
  Flex,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  StatHelpText,
} from "@chakra-ui/react";
import { Maybe } from "../../types/generic";
import { GeoLocation, GeoLocation3D } from "../../types/location";
const { greatCircleDistance } = require("great-circle-distance");

interface Props {
  userLocation: Maybe<GeoLocation3D>;
  manualLocation: Maybe<GeoLocation3D>;
}

interface StatsError {
  absolute: number;
  relative: {
    type: "increase" | "decrease" | undefined;
    value: number;
  };
}

const AccuracyStatistics = ({ userLocation, manualLocation }: Props) => {
  function calculateError(
    u: Maybe<number>,
    l: Maybe<number>
  ): StatsError | undefined {
    if (u === undefined || l === undefined) return undefined;
    const absolute = Math.abs(u - l);
    const relativeVal = (absolute / l) * 100;
    const type: "increase" | "decrease" | undefined =
      relativeVal > 0 ? "increase" : relativeVal < 0 ? "decrease" : undefined;
    const relative = {
      value: relativeVal,
      type,
    };
    return {
      absolute,
      relative,
    };
  }

  function calculateDistance(u: GeoLocation, l: GeoLocation): number {
    return (
      greatCircleDistance({
        lat1: u.lat,
        lat2: l.lat,
        lng1: u.lng,
        lng2: l.lng,
      }) * 1000
    );
  }
  function calculateDistance3D(
    u: GeoLocation3D,
    l: GeoLocation3D
  ): Maybe<number> {
    if (u.alt === undefined || l.alt === undefined) return undefined;
    return Math.sqrt(calculateDistance(u, l) ** 2 + (u.alt - l.alt) ** 2);
  }

  const stats =
    userLocation && manualLocation
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
        <Stat>
          {text} error<StatNumber>Unknown</StatNumber>
        </Stat>
      );
    return (
      <Stat>
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
        <Stat>
          {text}
          <StatNumber>Unknown</StatNumber>
        </Stat>
      );
    return (
      <Stat>
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
    <>
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
        {statElements}
      </Flex>
    </>
  );
};

export default AccuracyStatistics;
