import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import GeofenceMap from "../components/map/GeofenceMap";
import type { Maybe } from "../types/generic.types";
import { Geofence } from "../types/geofence.types";
import type { GeoLocation, GeoLocationMeasured3D } from "../types/location.types";
import { v4 as uuid } from "uuid";

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
    exitPoint: undefined
  });
  // Buffer of recent user locations
  const [locationBuffer, setLocationBuffer] = useState<GeoLocationMeasured3D[]>([])

  // Handling adding a point to geofence
  const handleAddPoint = (newPoint: Maybe<GeoLocation>) => {
    if (newPoint === undefined) return;
    const id = uuid();
    setGeofence({
      points: geofence.points.concat({ ...newPoint, id }),
      active: geofence.active,
      entryPoint: geofence.entryPoint,
      exitPoint: geofence.exitPoint
    });
  };

  // Handling removing a point from geofence based on id
  const handleRemovePoint = (id: string) => {
    setGeofence({
      points: geofence.points.filter((p) => p.id !== id),
      active: geofence.active,
      entryPoint: geofence.entryPoint,
      exitPoint: geofence.exitPoint
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
      exitPoint: geofence.exitPoint
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
      exitPoint: geofence.exitPoint
    });
  };

  // Updates user's location
  const refreshLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            alt: position.coords.altitude || undefined,
            accuracy: position.coords.accuracy,
            accuracyAlt: position.coords.altitudeAccuracy || undefined,
          }
          setLocation(newPosition);

          // If the location buffer is full, remove the first entry and add a new one
          if (locationBuffer.length === BUFFER_LENGTH)
            setLocationBuffer(locationBuffer.slice(1, locationBuffer.length).concat([newPosition]));
          else
            setLocationBuffer(locationBuffer.concat([newPosition]));
        },
        (error) => {
          alert(error.message);
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

  return (
    <Box w="100%">
      <Flex direction="column">
        <GeofenceMap
          userLocation={location}
          geofence={geofence}
          userLocationBuffer={locationBuffer}
          onAddPoint={handleAddPoint}
          onRemovePoint={handleRemovePoint}
          onHoverStartPoint={handleHoverStartPoint}
          onHoverEndPoint={handleHoverEndPoint}
        />
      </Flex>
    </Box>
  );
};

export default Accuracy;
