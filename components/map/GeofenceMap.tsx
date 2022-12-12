import { Box, Heading } from "@chakra-ui/react";
import GoogleMapReact, { ClickEventValue } from "google-map-react";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Maybe } from "../../types/generic.types";
import { Geofence } from "../../types/geofence.types";
import type {
  GeoLocation,
  GeoLocationId,
  GeoLocationMeasured,
  MapMarker,
} from "../../types/location.types";
import PointList from "./PointList";
import Marker from "./Marker";
import {
  fenceActiveLocationColor,
  fenceLocationColor,
  fenceLocationHoverColor,
  fencePathColor,
  userLocationColor,
} from "../../styles/colors";

const MapErrorFallback = () => {
  return <Heading>There has been an error, when loading the map.</Heading>;
};

interface Props {
  // Location of the user
  userLocation: Maybe<GeoLocationMeasured>;
  userPath: GeoLocationId[];
  // Geofence information {points: [], active: boolean}
  geofence: Geofence;
  userLocationBuffer: GeoLocation[];
  // Events get emmited
  onAddPoint: (_: Maybe<GeoLocation>) => any;
  onRemovePoint: (_: string) => any;
  onHoverStartPoint: (_: string) => any;
  onHoverEndPoint: (_: string) => any;
}

const GeofenceMap = ({
  userLocation,
  userPath,
  geofence,
  userLocationBuffer,
  onAddPoint,
  onRemovePoint,
  onHoverStartPoint,
  onHoverEndPoint,
}: Props) => {
  // Holds information about the pin and accuracy circle around user's location
  const [userMarker, setUserMarker] = useState<Maybe<MapMarker>>(undefined);
  // Hold information about the polygon displayed on the map
  const [polygon, setPolygon] = useState<any>(undefined);
  // Holds information about the path
  const [path, setPath] = useState<any>(undefined);
  // New point to be added from the form
  const [newPoint, setNewPoint] = useState<Maybe<GeoLocation>>(undefined);
  // Objects for controlling the google map
  const [googleMaps, setGoogleMaps] = useState<any | null>({
    map: undefined,
    maps: undefined,
  });

  // Rerender the polygon when it updates
  useEffect(() => {
    if (googleMaps && polygon) {
      polygon.setMap(null);
    }
    if (googleMaps && geofence.points.length > 2) {
      const color = geofence.active ? fenceActiveLocationColor : fenceLocationColor;
      const path = geofence.points
        .map((p) => ({ lat: p.lat, lng: p.lng }))
        .concat(geofence.points[0]);
      const poly = new googleMaps.maps.Polygon({
        paths: path,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.35,
      });
      setPolygon(poly);
      poly.setMap(googleMaps.map);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleMaps, geofence.points, geofence.active]);

  // Rerender the polygon when it updates
  useEffect(() => {
    if (googleMaps && path) {
      path.setMap(null);
    }
    if (googleMaps && userPath.length > 1) {
      const path = userPath.map((p) => ({ lat: p.lat, lng: p.lng }));
      const poly = new googleMaps.maps.Polyline({
        path: path,
        strokeColor: fencePathColor,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: fencePathColor,
        fillOpacity: 0.35,
      });
      setPath(poly);
      poly.setMap(googleMaps.map);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleMaps, userPath]);

  // Default props for the map component
  const defaultProps = {
    center: {
      lat: 60.172059,
      lng: 24.945831,
    },
    zoom: 12,
  };

  // Save the google maps objects for later use
  const apiIsLoaded = (map: any, maps: any) => {
    setGoogleMaps({ map, maps });
  };

  // Updates user marker and accuracy circle, as well as the geofence activity status and entry/exit point when location changes
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

  // Handling clicking on the map
  function handleClick(e: ClickEventValue) {
    setNewPoint({
      lat: e.lat,
      lng: e.lng,
    });
  }

  function onLatInputChange(lat: number) {
    setNewPoint({
      lat,
      lng: newPoint ? newPoint.lng : 0,
    });
  }

  function onLngInputChange(lng: number) {
    setNewPoint({
      lat: newPoint ? newPoint.lat : 0,
      lng,
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
              <Marker lat={newPoint.lat} lng={newPoint.lng} color={fenceLocationColor} />
            )}
            {geofence.points.map((g) => {
              const color =
                g.hovered === true
                  ? fenceLocationHoverColor
                  : geofence.active
                  ? fenceActiveLocationColor
                  : fenceLocationColor;
              const size = g.hovered === true ? "md" : "sm";
              return <Marker lat={g.lat} lng={g.lng} color={color} key={g.id} size={size} />;
            })}
            {userPath.map((p: GeoLocationId, i: number) => {
              if (i === 0 || i == userPath.length - 1) {
                return (
                  <Marker lat={p.lat} lng={p.lng} color={fencePathColor} key={p.id} size={"md"} />
                );
              }
            })}
          </GoogleMapReact>
        </Box>
        <PointList
          geofence={geofence.points}
          newPoint={newPoint}
          onAdd={() => {
            onAddPoint(newPoint);
            setNewPoint(undefined);
          }}
          onRemove={onRemovePoint}
          onHoverStart={onHoverStartPoint}
          onHoverEnd={onHoverEndPoint}
          onLatChange={onLatInputChange}
          onLngChange={onLngInputChange}
        />
      </ErrorBoundary>
    </>
  );
};

export default GeofenceMap;
