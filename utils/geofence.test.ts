import { GeofencePoint } from "../types/geofence.types";
import { GeoLocation } from "../types/location.types";
import { calculateIntersection, findEntryPointGeofence, findExitPointGeofence, isPointBetweenTwoPoints, isPointInGeofence } from "./geofence";

describe("isUserInGeofence", () => {
  const geofence1: GeofencePoint[] = [
    {
      id: "1",
      lat: 60.186265611756525,
      lng: 24.833957071317254,
    },
    {
      id: "2",
      lat: 60.186260277572345,
      lng: 24.835512752545892,
    },
    {
      id: "3",
      lat: 60.18500672026161,
      lng: 24.835684413922845,
    },
    {
      id: "4",
      lat: 60.18503339219208,
      lng: 24.834010715497552,
    },
  ];
  const userLocation1: GeoLocation = { lat: 60.18572804752291, lng: 24.83476969111838 }; // Inside geofence1
  const userLocation2: GeoLocation = { lat: 60.18638059934714, lng: 24.834787571655433 }; // Outside geofence1

  const geofence2: GeofencePoint[] = [
    {
      id: "1",
      lat: 60.186555396237125,
      lng: 24.830900423230613,
    },
    {
      id: "2",
      lat: 60.18594330870752,
      lng: 24.831946443085346,
    },
    {
      id: "3",
      lat: 60.18496121114577,
      lng: 24.830776999954853,
    },
    {
      id: "4",
      lat: 60.18531208307393,
      lng: 24.827227236583724,
    },
    {
      id: "5",
      lat: 60.18566170747165,
      lng: 24.827895806825694,
    },
    {
      id: "6",
      lat: 60.18555851149064,
      lng: 24.82879086369931,
    },
  ];
  const userLocation3: GeoLocation = { lat: 60.185420297873016, lng: 24.828107114206485 }; // Inside geofence2
  const userLocation4: GeoLocation = { lat: 60.18575902551353, lng: 24.828616733919315 }; // Outisde geofence2

  test("recognizes when user is in geofence", () => {
    expect(isPointInGeofence(userLocation1, geofence1)).toBe(true);
    expect(isPointInGeofence(userLocation3, geofence2)).toBe(true);
  });



  // --- > Was toBe(true); Not sure if it was meant to be ? 
  test("recognizes when user is outside geofence", () => {
    expect(isPointInGeofence(userLocation2, geofence1)).toBe(false);
    expect(isPointInGeofence(userLocation3, geofence1)).toBe(false);
    expect(isPointInGeofence(userLocation4, geofence1)).toBe(false);

    expect(isPointInGeofence(userLocation4, geofence2)).toBe(false);
    expect(isPointInGeofence(userLocation1, geofence2)).toBe(false);
    expect(isPointInGeofence(userLocation2, geofence2)).toBe(false);
  });

  test("returns false for non-polygons geofences", () => {
    expect(isPointInGeofence(userLocation1, [])).toBe(false);
    expect(
      isPointInGeofence(userLocation1, [
        {
          id: "1",
          lat: 60.186265611756525,
          lng: 24.833957071317254,
        },
      ]),
    ).toBe(false);
    expect(
      isPointInGeofence(userLocation1, [
        {
          id: "1",
          lat: 60.186265611756525,
          lng: 24.833957071317254,
        },

        {
          id: "2",
          lat: 60.186260277572345,
          lng: 24.835512752545892,
        },
      ]),
    ).toBe(false);
  });
});

describe("testCalculateIntersection", () => {
  const geofence1: GeofencePoint[] = [
    {
      id: "1",
      lat: 60.18542161179756,
      lng: 24.81550024418825,
    },
    {
      id: "2",
      lat: 60.18286103794657,
      lng: 24.82648657231325,
    },
    {
      id: "3",
      lat: 60.18852024503663,
      lng: 24.82935878719666,
    }
  ];
  const p1: GeoLocation = { lat: 60.18471173797174, lng: 24.81929533910841 }; // Inside geofence1
  const p2: GeoLocation = { lat: 60.184434346118316, lng: 24.818673066616956 }; // Outside geofence1

  test("returns the intersection point", () => {
    const intersection1 = calculateIntersection(p1, p2, geofence1[0], geofence1[1]);
    expect(intersection1).toBeDefined();

    const intersection2 = calculateIntersection(p1, p2, geofence1[1], geofence1[0]);
    expect(intersection2).toBeDefined();

    const intersection3 = calculateIntersection(p1, p2, geofence1[1], geofence1[2]);
    expect(intersection3).toBeDefined();

    const intersection4 = calculateIntersection(p1, p2, geofence1[2], geofence1[0]);
    expect(intersection4).toBeDefined();

  });
});

describe("testGeofenceEntryPoint", () => {
  const geofence1: GeofencePoint[] = [
    {
      id: "1",
      lat: 60.18542161179756,
      lng: 24.81550024418825,
    },
    {
      id: "2",
      lat: 60.18286103794657,
      lng: 24.82648657231325,
    },
    {
      id: "3",
      lat: 60.18852024503663,
      lng: 24.82935878719666,
    }
  ];
  const p1: GeoLocation = { lat: 60.184434346118316, lng: 24.818673066616956 }; // Outside geofence1
  const p2: GeoLocation = { lat: 60.18471173797174, lng: 24.81929533910841 }; // Inside geofence1
  const userLocations = [p1, p2];

  test("returns a point that is between the user locations", () => {
    const entryPoint = findEntryPointGeofence(userLocations, geofence1);
    expect(entryPoint).toBeDefined();

    if (entryPoint) {
      const isBetweenUserLocations = isPointBetweenTwoPoints(entryPoint, p1, p2)
      expect(isBetweenUserLocations).toBe(true);
    }
    console.log("Entry point: ", entryPoint);
  });
});

describe("testGeofenceExitPoint", () => {
  const geofence1: GeofencePoint[] = [
    {
      id: "1",
      lat: 60.18542161179756,
      lng: 24.81550024418825,
    },
    {
      id: "2",
      lat: 60.18286103794657,
      lng: 24.82648657231325,
    },
    {
      id: "3",
      lat: 60.18852024503663,
      lng: 24.82935878719666,
    }
  ];
  const p1: GeoLocation = { lat: 60.18471173797174, lng: 24.81929533910841 }; // Inside geofence1
  const p2: GeoLocation = { lat: 60.184434346118316, lng: 24.818673066616956 }; // Outside geofence1

  test("returns a point that is between the user locations", () => {
    const exitPoint = findExitPointGeofence([p1, p2], geofence1);
    expect(exitPoint).toBeDefined();

    if (exitPoint) {
      const isBetweenUserLocations = isPointBetweenTwoPoints(exitPoint, p1, p2)
      expect(isBetweenUserLocations).toBe(true);
    }

  });
});
