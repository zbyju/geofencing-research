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
  onRemove?: (id: string) => any;
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
                  <NumberInput value={p.lat} isReadOnly>
                    <NumberInputField placeholder="Latitude" w="auto" />
                  </NumberInput>
                  <NumberInput value={p.lng} isReadOnly>
                    <NumberInputField placeholder="Longitude" w="auto" />
                  </NumberInput>
                  <Button onClick={() => onRemove && onRemove(p.id)}>
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
