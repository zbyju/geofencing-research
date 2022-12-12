import { Box, Button, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import GeofenceMap from "../components/map/GeofenceMap";
import type { Maybe } from "../types/generic.types";
import { Geofence } from "../types/geofence.types";
import type { GeoLocation, GeoLocationId, GeoLocationMeasured3D } from "../types/location.types";
import { v4 as uuid } from "uuid";
import {
  findEntryPointGeofence,
  findExitPointGeofence,
  isPointInGeofence,
} from "../utils/geofence";

// Geolocation buffer length
const BUFFER_LENGTH = 10;

const Accuracy: NextPage = () => {
  // User location
  const [location, setLocation] = useState<Maybe<GeoLocationMeasured3D>>(undefined);
  // Geofence { points: [], active: bool }
  const [geofence, setGeofence] = useState<Geofence>({
    points: [],
    active: false,
    entryPoint: undefined,
    exitPoint: undefined,
  });
  // Buffer of recent user locations
  const [locationBuffer, setLocationBuffer] = useState<GeoLocationMeasured3D[]>([]);
  // User path
  const [path, setPath] = useState<GeoLocationId[]>([]);

  // Handling adding a point to geofence
  const handleAddPoint = (newPoint: Maybe<GeoLocation>) => {
    if (newPoint === undefined) return;
    const id = uuid();
    setGeofence({
      points: geofence.points.concat({ ...newPoint, id }),
      active: geofence.active,
      entryPoint: geofence.entryPoint,
      exitPoint: geofence.exitPoint,
    });
  };

  // Handling removing a point from geofence based on id
  const handleRemovePoint = (id: string) => {
    setGeofence({
      points: geofence.points.filter((p) => p.id !== id),
      active: geofence.active,
      entryPoint: geofence.entryPoint,
      exitPoint: geofence.exitPoint,
    });
  };

  // Handling hovering over a point in geofence
  const handleHoverStartPoint = (id: string) => {
    setGeofence({
      points: geofence.points.map((g) => {
        const hovered = g.id === id;
        return { ...g, hovered: hovered };
      }),
      active: geofence.active,
      entryPoint: geofence.entryPoint,
      exitPoint: geofence.exitPoint,
    });
  };

  // Handling stopping hovering over a point
  const handleHoverEndPoint = (_: string) => {
    setGeofence({
      points: geofence.points.map((p) => {
        return { ...p, hovered: false };
      }),
      active: geofence.active,
      entryPoint: geofence.entryPoint,
      exitPoint: geofence.exitPoint,
    });
  };

  // Updates user's location
  const refreshLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            alt: position.coords.altitude || undefined,
            accuracy: position.coords.accuracy,
            accuracyAlt: position.coords.altitudeAccuracy || undefined,
          });
        },
        (error) => {
          console.log(error.message);
        },
        { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true },
      );
    } else {
      console.log("Geo not available");
    }
  };

  // On load
  useEffect(() => {
    refreshLocation();
  }, []);

  useEffect(() => {
    if (location === undefined) return;
    console.log(location);

    // If the location buffer is full, remove the first entry and add a new one
    const newBuffer =
      locationBuffer.length === BUFFER_LENGTH
        ? locationBuffer.slice(1, locationBuffer.length).concat([location])
        : locationBuffer.concat([location]);

    setLocationBuffer(newBuffer);

    const isUserIn = isPointInGeofence(location, geofence.points);
    console.log(isUserIn);
    if (isUserIn && !geofence.active) {
      // User just entered
      const entry = findEntryPointGeofence(newBuffer, geofence.points);
      setGeofence({
        ...geofence,
        active: true,
        entryPoint: entry,
      });
      const newPath: GeoLocationId[] = ([] as GeoLocationId[]).concat([
        { ...entry!, id: uuid() },
        { ...location, id: uuid() },
      ]);
      setPath(newPath);
    } else if (!isUserIn && geofence.active) {
      // Just exited
      setGeofence({
        ...geofence,
        active: false,
        exitPoint: findExitPointGeofence(newBuffer, geofence.points),
      });
    } else if (isUserIn) {
      setPath(path.concat({ ...location, id: uuid() }));
    }
  }, [location, geofence.points]);

  return (
    <Box w="100%">
      <Flex direction="column">
        <Button onClick={refreshLocation}>Refresh location</Button>
        <GeofenceMap
          userLocation={location}
          userPath={path}
          geofence={geofence}
          userLocationBuffer={locationBuffer}
          onAddPoint={handleAddPoint}
          onRemovePoint={handleRemovePoint}
          onHoverStartPoint={handleHoverStartPoint}
          onHoverEndPoint={handleHoverEndPoint}
        />
        <p>points: {locationBuffer.map((l) => JSON.stringify(l))}</p>
        <p>len: {locationBuffer.length}</p>
        <p>is in: {geofence.active ? "true" : "false"}</p>
        <p>entry: {JSON.stringify(geofence.entryPoint)}</p>
        <p>exit: {JSON.stringify(geofence.exitPoint)}</p>
      </Flex>
    </Box>
  );
};

export default Accuracy;
