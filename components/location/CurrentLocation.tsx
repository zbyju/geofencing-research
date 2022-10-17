import { Heading, ListItem, UnorderedList, Text } from "@chakra-ui/react";
import { GeoLocationMeasured3D } from "../../types/location";

interface Props {
  location?: GeoLocationMeasured3D;
}

const CurrentLocation = ({ location }: Props) => {
  return (
    <>
      <Heading>Current location</Heading>
      {location ? (
        <UnorderedList>
          <ListItem>lat: {location.lat}</ListItem>
          <ListItem>lng: {location.lng}</ListItem>
          <ListItem>acc: {location.accuracy}</ListItem>
          <ListItem>alt: {location.altitude}</ListItem>
          <ListItem>accAlt: {location.accuracyAltitude}</ListItem>
        </UnorderedList>
      ) : (
        <Text>Unknown location</Text>
      )}
    </>
  );
};

export default CurrentLocation;
