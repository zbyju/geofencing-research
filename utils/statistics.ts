import { Maybe } from "../types/generic.types";
import { GeoLocation, GeoLocation3D } from "../types/location.types";
import { StatsError } from "../types/statistics.types";
const { greatCircleDistance } = require("great-circle-distance");

export function calculateError(
  u: Maybe<number>,
  l: Maybe<number>
): StatsError | undefined {
  if (u === undefined || l === undefined) return undefined;
  const absolute = u - l;
  const type: "increase" | "decrease" | undefined =
    absolute > 0 ? "increase" : absolute < 0 ? "decrease" : undefined;
  const absoluteVal = Math.abs(absolute);
  const relativeVal = (absoluteVal / l) * 100;
  const relative = {
    value: relativeVal,
    type,
  };
  return {
    absolute: absoluteVal,
    relative,
  };
}

export function calculateDistance(u: GeoLocation, l: GeoLocation): number {
  return (
    greatCircleDistance({
      lat1: u.lat,
      lat2: l.lat,
      lng1: u.lng,
      lng2: l.lng,
    }) * 1000
  );
}

export function calculateDistance3D(
  u: GeoLocation3D,
  l: GeoLocation3D
): Maybe<number> {
  if (u.alt === undefined || l.alt === undefined) return undefined;
  return Math.sqrt(calculateDistance(u, l) ** 2 + (u.alt - l.alt) ** 2);
}
