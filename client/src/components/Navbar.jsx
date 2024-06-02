import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Spacer,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Portal,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const bgColor = useColorModeValue("gray.200", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const { auth, logout } = useAuth();
  const { token, username } = auth;

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Flex
      as="nav"
      minWidth="max-content"
      alignItems="center"
      gap="2"
      p={5}
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      backgroundColor="rgb(7, 15, 43)"
    >
      <Box p="2">
        <Link href="/" style={{ textDecoration: "none" }}>
          <Heading fontWeight="bold">CodeCrew</Heading>
        </Link>
      </Box>
      <Spacer />
      {token ? (
        <Flex alignItems="center">
          <Link
            href="/create-project"
            style={{ textDecoration: "none", marginRight: "10px" }}
          >
            <Button colorScheme="teal" variant="outline">
              Create session
            </Button>
          </Link>
          <Link
            href="/join-project"
            style={{ textDecoration: "none", marginRight: "10px" }}
          >
            <Button colorScheme="teal" variant="outline">
              Join session
            </Button>
          </Link>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              borderRadius="full"
              p={1}
              colorScheme="teal"
              icon={<Box as="span">{username ? username.charAt(0) : "U"}</Box>}
              _hover={{ bg: "teal.500" }}
              rightIcon={<ChevronDownIcon />}
            ></MenuButton>
            <Portal>
              <MenuList>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem>
                  <Link href="/archive" style={{ textDecoration: "none" }}>
                    Archive
                  </Link>
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Flex>
      ) : (
        <Box>
          <Link href="/login" style={{ textDecoration: "none" }}>
            <Button colorScheme="teal" variant="outline">
              Login
            </Button>
          </Link>
          <Link ml={4} href="/register" style={{ textDecoration: "none" }}>
            <Button colorScheme="teal" variant="solid">
              Sign Up
            </Button>
          </Link>
        </Box>
      )}
    </Flex>
  );
}

export default Navbar;
