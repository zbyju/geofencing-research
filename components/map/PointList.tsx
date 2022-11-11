import {
  Box,
  Button,
  Divider,
  Flex,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { Maybe } from "../../types/generic.types";
import { GeofencePoint } from "../../types/geofence.types";
import { GeoLocation } from "../../types/location.types";
import PointForm from "./PointForm";

interface Props {
  geofence: GeofencePoint[];
  newPoint: Maybe<GeoLocation>;
  onAdd: () => any;
  onRemove?: (_: string) => any;
}

const PointList = ({ geofence, newPoint, onAdd, onRemove }: Props) => {
  return (
    <>
      <Box boxShadow="md" py={3}>
        <Flex direction="column" justify="flex-start" align="center" gap="5px">
          {geofence === undefined ? (
            <>No points</>
          ) : (
            geofence.map((p) => {
              return (
                <Flex direction="row" gap="5px" wrap="wrap" key={p.id}>
                  <Flex direction="row" gap="5px" wrap="wrap" m="auto">
                    <NumberInput value={p.lat} isReadOnly m="auto">
                      <NumberInputField placeholder="Latitude" w="100%" />
                    </NumberInput>
                    <NumberInput value={p.lng} isReadOnly m="auto">
                      <NumberInputField placeholder="Longitude" w="100%" />
                    </NumberInput>
                  </Flex>
                  <Button
                    onClick={() => onRemove && onRemove(p.id)}
                    m="auto"
                    colorScheme="red"
                  >
                    Remove
                  </Button>
                </Flex>
              );
            })
          )}
          <Divider my={1} />
          <PointForm location={newPoint} onAdd={onAdd} />
        </Flex>
      </Box>
    </>
  );
};

export default PointList;
