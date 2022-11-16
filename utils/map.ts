import { Maybe } from "../types/generic.types";
import { GeoLocation, GeoLocationMeasured, MapMarker } from "../types/location.types";

export const locationToMarker = (
  googleMaps: any,
  l: GeoLocationMeasured | GeoLocation | undefined,
  color: string,
): Maybe<MapMarker> => {
  if (l === undefined) return undefined;
  let acc = undefined;
  if ("accuracy" in l) acc = l.accuracy;
  return {
    pin: {
      ...l,
      color,
    },
    accuracyCircle: new googleMaps.maps.Circle({
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.35,
      map: googleMaps.map,
      center: { lat: l.lat, lng: l.lng },
      radius: acc,
    }),
  };
};

export const isMarkerCorrect = (l: Maybe<GeoLocation>, m: MapMarker): boolean => {
  if (l === undefined) return false;
  return l.lat === m.pin.lat && l.lng === m.pin.lng;
};

export const isMarkerDrawn = (l: Maybe<GeoLocation>, markers: MapMarker[]): boolean => {
  if (l === undefined) false;
  return markers.findIndex((m) => isMarkerCorrect(l, m)) !== -1;
};
