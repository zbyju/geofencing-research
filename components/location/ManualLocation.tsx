import {
  Box,
  Flex,
  Heading,
  Input,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Maybe } from "../../types/generic.types";
import { GeoLocation3D } from "../../types/location.types";

interface Props {
  location?: GeoLocation3D;
  onChange?: (newLocation: GeoLocation3D) => any;
}

const ManualLocation = ({ location, onChange }: Props) => {
  const [lat, setLat] = useState<Maybe<number>>(location?.lat || undefined);
  const [lng, setLng] = useState<Maybe<number>>(location?.lng || undefined);
  const [alt, setAlt] = useState<Maybe<number>>(location?.alt || undefined);

  useEffect(() => {
    if (location === undefined) return;
    if (location.lat !== undefined) setLat(location.lat);
    if (location.lng !== undefined) setLng(location.lng);
    if (location.alt !== undefined) setAlt(location.alt);
  }, [location]);

  useEffect(() => {
    onChange &&
      lat !== undefined &&
      lng !== undefined &&
      onChange({ lat, lng, alt });
  }, [lat, lng, alt]);

  return (
    <Box my={3} shadow="md" borderRadius="8px" overflow="hidden">
      <Heading px={5} py={2} size="md" bg="purple.100">
        Manual location
      </Heading>
      <Flex
        px={5}
        py={2}
        direction="row"
        justify="space-between"
        align="center"
        wrap="wrap"
        overflowX="scroll"
        w="100%"
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
    </Box>
  );
};

export default ManualLocation;
