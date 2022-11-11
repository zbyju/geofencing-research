import { Box, Heading } from "@chakra-ui/react";
import GoogleMapReact, { ClickEventValue } from "google-map-react";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Maybe } from "../../types/generic.types";
import { Geofence, GeofencePoint } from "../../types/geofence.types";
import { v4 as uuid } from "uuid";
import type {
  GeoLocation,
  GeoLocationMeasured,
  MapMarker,
} from "../../types/location.types";
import PointList from "./PointList";
import Marker from "./Marker";
import {
  fenceLocationColor,
  fenceLocationHoverColor,
  userLocationColor,
} from "../../styles/colors";

const MapErrorFallback = () => {
  return <Heading>There has been an error, when loading the map.</Heading>;
};

interface Props {
  userLocation: Maybe<GeoLocationMeasured>;
  geofence: Maybe<Geofence>;
  // eslint-disable-next-line unused-imports/no-unused-vars
  onClick: (location: GeoLocation) => any;
}

const GeofenceMap = ({ userLocation }: Props) => {
  const [userMarker, setUserMarker] = useState<Maybe<MapMarker>>(undefined);
  const [geopoints, setGeopoints] = useState<GeofencePoint[]>([]);
  const [polygon, setPolygon] = useState<any>(undefined);
  const [newPoint, setNewPoint] = useState<Maybe<GeoLocation>>(undefined);
  const [googleMaps, setGoogleMaps] = useState<any | null>({
    map: undefined,
    maps: undefined,
  });

  const handleAdd = () => {
    if (newPoint === undefined) return;
    const id = uuid();
    setGeopoints(geopoints.concat({ ...newPoint, id }));
    setNewPoint(undefined);
  };

  const handleRemove = (id: string) => {
    setGeopoints(geopoints.filter((p) => p.id !== id));
  };

  const handleHoverStart = (id: string) => {
    setGeopoints(
      geopoints.map((g) => {
        const hovered = g.id === id;
        return { ...g, hovered: hovered };
      })
    );
  };

  const handleHoverEnd = (id: string) => {
    setGeopoints(
      geopoints.map((g) => {
        return { ...g, hovered: false };
      })
    );
  };

  useEffect(() => {
    if (googleMaps && polygon) {
      polygon.setMap(null);
    }
    if (googleMaps && geopoints.length > 2) {
      const path = geopoints
        .map((p) => ({ lat: p.lat, lng: p.lng }))
        .concat(geopoints[0]);
      const poly = new googleMaps.maps.Polygon({
        paths: path,
        strokeColor: fenceLocationColor,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: fenceLocationColor,
        fillOpacity: 0.35,
      });
      setPolygon(poly);
      poly.setMap(googleMaps.map);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleMaps, geopoints]);

  // Default props for the map component
  const defaultProps = {
    center: {
      lat: 60.172059,
      lng: 24.945831,
    },
    zoom: 12,
  };

  const apiIsLoaded = (map: any, maps: any) => {
    setGoogleMaps({ map, maps });
  };

  // Centers map when user location changes
  // Updates user marker and accuracy circle when location changes
  useEffect(() => {
    if (googleMaps.map && googleMaps.maps && userLocation) {
      if (userMarker?.accuracyCircle !== undefined) {
        userMarker.accuracyCircle.setMap(null);
      }
      setUserMarker({
        pin: { ...userLocation, color: userLocationColor },
        accuracyCircle:
          userLocation.accuracy !== undefined
            ? new googleMaps.maps.Circle({
                strokeColor: userLocationColor,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: userLocationColor,
                fillOpacity: 0.35,
                map: googleMaps.map,
                center: { lat: userLocation.lat, lng: userLocation.lng },
                radius: userLocation.accuracy || 0.01,
              })
            : undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation, googleMaps]);

  function handleClick(e: ClickEventValue) {
    setNewPoint({
      lat: e.lat,
      lng: e.lng,
    });
  }

  return (
    <>
      <ErrorBoundary FallbackComponent={MapErrorFallback}>
        <Box w="100%" h="40vh">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
            onClick={handleClick}
          >
            {userMarker?.pin !== undefined && (
              <Marker
                lat={userMarker.pin.lat}
                lng={userMarker.pin.lng}
                color={userMarker.pin.color}
              />
            )}
            {newPoint !== undefined && (
              <Marker
                lat={newPoint.lat}
                lng={newPoint.lng}
                color={fenceLocationColor}
              />
            )}
            {geopoints.map((g) => {
              const color =
                g.hovered === true
                  ? fenceLocationHoverColor
                  : fenceLocationColor;
              const size = g.hovered === true ? "md" : "sm";
              return (
                <Marker
                  lat={g.lat}
                  lng={g.lng}
                  color={color}
                  key={g.id}
                  size={size}
                />
              );
            })}
          </GoogleMapReact>
          <PointList
            geofence={geopoints}
            newPoint={newPoint}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
          />
        </Box>
      </ErrorBoundary>
    </>
  );
};

export default GeofenceMap;
