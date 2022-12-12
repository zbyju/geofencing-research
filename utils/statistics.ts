import { Maybe } from "../types/generic.types";
import {
  GeoLocation,
  GeoLocation3D,
  ManualGeoLocation,
  ManualGeoLocation3D,
} from "../types/location.types";
import { StatsError } from "../types/statistics.types";
import { GeofenceTimes } from "../types/times.types";
import { isNumeric } from "./typeChecking";
const { greatCircleDistance } = require("great-circle-distance");

export function calculateDuration(times: GeofenceTimes): Maybe<number> {
  if (times.start === undefined || times.end === undefined) return undefined;
  return (times.end.getTime() - times.start.getTime()) / 1000;
}

export function calculatePathDistance(path: GeoLocation[]): Maybe<number> {
  if (path.length <= 1) return undefined;
  return path.reduce((sum: number, p: GeoLocation, i: number, arr: GeoLocation[]) => {
    if (i === 0) return sum;
    const distance = calculateDistance(arr[i - 1], p);
    return sum + (distance ?? 0);
  }, 0);
}

export function calculateError(
  u: Maybe<number>,
  l: Maybe<number | string>,
): StatsError | undefined {
  if (u === undefined || l === undefined || !isNumeric(l)) return undefined;
  l = Number(l);
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

export function calculateDistance(u: GeoLocation, l: ManualGeoLocation): Maybe<number> {
  if (!isNumeric(l.lat) || !isNumeric(l.lng)) return undefined;
  return (
    greatCircleDistance({
      lat1: u.lat,
      lat2: Number(l.lat),
      lng1: u.lng,
      lng2: Number(l.lng),
    }) * 1000
  );
}

export function calculateDistance3D(u: GeoLocation3D, l: ManualGeoLocation3D): Maybe<number> {
  if (
    u === undefined ||
    l === undefined ||
    u.alt === undefined ||
    l.alt === undefined ||
    !isNumeric(l.alt)
  )
    return undefined;
  const distance = calculateDistance(u, l);
  if (distance === undefined) return undefined;
  return Math.sqrt(distance ** 2 + (u.alt - l.alt) ** 2);
}
