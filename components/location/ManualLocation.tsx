import {
  Box,
  Flex,
  Heading,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { ManualGeoLocation3D } from "../../types/location.types";

interface Props {
  location?: ManualGeoLocation3D;
  onChangeLat: (_: string) => any;
  onChangeLng: (_: string) => any;
  onChangeAlt: (_: string) => any;
}

const ManualLocation = ({
  location,
  onChangeLat,
  onChangeLng,
  onChangeAlt,
}: Props) => {
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
        <NumberInput
          value={location?.lat || ""}
          onChange={(s) => onChangeLat(s)}
        >
          <NumberInputField placeholder="Latitude" w="auto" />
        </NumberInput>
        <NumberInput
          value={location?.lng || ""}
          onChange={(s) => onChangeLng(s)}
        >
          <NumberInputField placeholder="Longitude" w="auto" />
        </NumberInput>
        <NumberInput
          value={location?.alt || ""}
          onChange={(s) => onChangeAlt(s)}
        >
          <NumberInputField placeholder="Altitude" w="auto" />
        </NumberInput>
      </Flex>
    </Box>
  );
};

export default ManualLocation;
