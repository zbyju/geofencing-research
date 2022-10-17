import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";

interface NavLink {
  text: string;
  href: string;
}

const Nav = () => {
  const links: NavLink[] = [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Accuracy test",
      href: "/accuracy",
    },
  ];

  console.log(links);

  return (
    <Box w="100vw" h="50px" shadow="md">
      <Flex h="100%" px={5} justify="space-between">
        <Heading>Geolocation</Heading>
        <Flex>
          {links.map((link) => (
            <Box key={link.text}>
              <NextLink href={link.href} passHref>
                <Button h="100%" variant="ghost">
                  {link.text}
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
