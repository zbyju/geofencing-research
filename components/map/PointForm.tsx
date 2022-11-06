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
        <NumberInput value={location?.lat || ""} isReadOnly bg="gray.100">
          <NumberInputField placeholder="Latitude" w="auto" />
        </NumberInput>
        <NumberInput value={location?.lng || ""} isReadOnly bg="gray.100">
          <NumberInputField placeholder="Longitude" w="auto" />
        </NumberInput>
        <Button onClick={() => onAdd()}>Add point</Button>
      </Flex>
    </>
  );
};

export default PointForm;
