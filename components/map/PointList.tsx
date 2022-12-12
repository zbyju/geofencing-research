import { Box, Button, Divider, Flex, NumberInput, NumberInputField } from "@chakra-ui/react";
import { Maybe } from "../../types/generic.types";
import { GeofencePoint } from "../../types/geofence.types";
import { GeoLocation } from "../../types/location.types";
import PointForm from "./PointForm";

interface Props {
  geofence: GeofencePoint[];
  newPoint: Maybe<GeoLocation>;
  onAdd: () => any;
  onRemove?: (_: string) => any;
  onHoverStart?: (_: string) => any;
  onHoverEnd?: (_: string) => any;
  onLatChange: (_: number) => any;
  onLngChange: (_: number) => any;
}

const PointList = ({ geofence, newPoint, onAdd, onRemove, onHoverStart, onHoverEnd, onLatChange, onLngChange }: Props) => {
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
                    <NumberInput value={p.lat} m="auto" bg="gray.100" color="gray.600">
                      <NumberInputField placeholder="Latitude" />
                    </NumberInput>
                    <NumberInput value={p.lng} m="auto" bg="gray.100" color="gray.600">
                      <NumberInputField placeholder="Longitude" w="100%" />
                    </NumberInput>
                  </Flex>
                  <Button
                    onClick={() => onRemove && onRemove(p.id)}
                    onMouseEnter={() => onHoverStart && onHoverStart(p.id)}
                    onMouseLeave={() => onHoverEnd && onHoverEnd(p.id)}
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
          <PointForm location={newPoint} onAdd={onAdd} onLatChange={onLatChange} onLngChange={onLngChange} />
        </Flex>
      </Box>
    </>
  );
};

export default PointList;
