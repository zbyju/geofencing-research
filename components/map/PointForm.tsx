import { Button, Flex, NumberInput, NumberInputField } from "@chakra-ui/react";
import { Maybe } from "../../types/generic.types";
import { GeoLocation } from "../../types/location.types";

interface Props {
  location: Maybe<GeoLocation>;
  onAdd: () => any;
  onLatChange: (_: number) => any;
  onLngChange: (_: number) => any;
}

const PointForm = ({ location, onAdd, onLatChange, onLngChange }: Props) => {
  return (
    <>
      <Flex direction="row" gap="5px" wrap="wrap">
        <Flex direction="row" wrap="wrap" gap="5px" m="auto">
          <NumberInput value={location?.lat || ""} bg="gray.100" m="auto" maxW="50%" onChange={(s) => onLatChange(parseFloat(s))}>
            <NumberInputField placeholder="Latitude" w="100%" />
          </NumberInput>
          <NumberInput value={location?.lng || ""} bg="gray.100" m="auto" maxW="50%" onChange={(s) => onLngChange(parseFloat(s))}>
            <NumberInputField placeholder="Longitude" w="100%" />
          </NumberInput>
        </Flex>
        <Button onClick={() => onAdd()} m="auto" colorScheme="green">
          Add point
        </Button>
      </Flex>
    </>
  );
};

export default PointForm;
