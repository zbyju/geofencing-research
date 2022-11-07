import { Button, Flex, NumberInput, NumberInputField } from "@chakra-ui/react";
import { Maybe } from "../../types/generic.types";
import { GeoLocation } from "../../types/location.types";

interface Props {
  location: Maybe<GeoLocation>;
  onAdd: () => any;
}

const PointForm = ({ location, onAdd }: Props) => {
  return (
    <>
      <Flex direction="row" gap="5px" wrap="wrap">
        <Flex direction="row" wrap="wrap" gap="5px" m="auto">
          <NumberInput
            value={location?.lat || ""}
            isReadOnly
            bg="gray.100"
            m="auto"
            maxW="50%"
          >
            <NumberInputField placeholder="Latitude" w="100%" />
          </NumberInput>
          <NumberInput
            value={location?.lng || ""}
            isReadOnly
            bg="gray.100"
            m="auto"
            maxW="50%"
          >
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
