import {
  Flex,
  Input,
  NumberInput,
  NumberInputField,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Maybe } from "../../types/generic";
import { GeoLocation3D } from "../../types/location";

interface Props {
  location?: GeoLocation3D;
  onChange?: (newLocation: GeoLocation3D) => any;
}

const ManualLocation = ({ location, onChange }: Props) => {
  const [lat, setLat] = useState<Maybe<number>>(location?.lat || undefined);
  const [lng, setLng] = useState<Maybe<number>>(location?.lng || undefined);
  const [alt, setAlt] = useState<Maybe<number>>(location?.alt || undefined);

  console.log(location);
  useEffect(() => {
    console.log(location);
    if (location === undefined) return;
    if (location.lat !== undefined) setLat(location.lat);
    if (location.lng !== undefined) setLng(location.lng);
    if (location.alt !== undefined) setAlt(location.alt);
  }, [location]);

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
        <NumberInput value={lat} onChange={(s) => setLat(Number(s))}>
          <NumberInputField placeholder="Latitude" w="auto" />
        </NumberInput>
        <NumberInput value={lng} onChange={(s) => setLng(Number(s))}>
          <NumberInputField placeholder="Longitude" w="auto" />
        </NumberInput>
        <NumberInput value={alt} onChange={(s) => setAlt(Number(s))}>
          <NumberInputField placeholder="Altitude" w="auto" />
        </NumberInput>
      </Flex>
    </>
  );
};

export default ManualLocation;
