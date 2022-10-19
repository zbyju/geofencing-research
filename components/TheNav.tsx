import {
  Box,
  Button,
  Flex,
  Heading,
  Hide,
  Icon,
  Link,
  Show,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaHome } from "react-icons/fa";
import { SiSpeedtest } from "react-icons/si";
import { GrMapLocation } from "react-icons/gr";
import { MdShareLocation } from "react-icons/md";

interface NavLink {
  text: string;
  icon: JSX.Element;
  href: string;
  disabled?: boolean;
}

const Nav = () => {
  const iconStyle = {
    w: 5,
    h: 5,
  };

  const links: NavLink[] = [
    {
      text: "Home",
      icon: <Icon as={FaHome} {...iconStyle} />,
      href: "/",
    },
    {
      text: "Accuracy test",
      icon: <Icon as={SiSpeedtest} {...iconStyle} />,
      href: "/accuracy",
    },
    {
      text: "Geofencing",
      icon: <Icon as={MdShareLocation} {...iconStyle} />,
      href: "/geofencing",
      disabled: true,
    },
  ];

  return (
    <Box w="100vw" h="50px" shadow="md" maxW="100%" overflow="hidden">
      <Flex h="100%" px={2} justify="space-between">
        <Show above="md">
          <Heading alignSelf="center">Geolocation</Heading>
        </Show>
        <Show below="md">
          <Icon as={GrMapLocation} w={10} h={10} alignSelf="center" />
        </Show>
        <Flex>
          {links.map((link) => (
            <Box key={link.text}>
              <NextLink href={link.href} passHref>
                <Button h="100%" variant="ghost" disabled={link.disabled}>
                  <Show above="sm">
                    <Box>{link.text}</Box>
                  </Show>
                  <Show below="sm">
                    <Box>{link.icon}</Box>
                  </Show>
                </Button>
              </NextLink>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Nav;
