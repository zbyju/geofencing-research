import { Icon } from "@chakra-ui/react";
import { IoLocationSharp } from "react-icons/io5";

const Marker = ({ color, size = "md" }: any) => {
  const boxSize = size === "md" ? 30 : size === "sm" ? 20 : 30;
  const boxSizePx = boxSize + "px";
  return (
    <Icon
      as={IoLocationSharp}
      color={color}
      transform="translate(-50%, -100%)"
      w={boxSizePx}
      h={boxSizePx}
    />
  );
};

export default Marker;
