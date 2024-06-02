import React from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Container,
  Flex,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "./components/AuthContext";

function Home() {
  const { auth } = useAuth();
  const isLoggedIn = !!auth.userId;

  return (
    <Container maxW="container.xxl" centerContent>
      <VStack spacing={50} mt={10} p={5} align="stretch">
        <Heading fontSize="9xl" fontWeight="bold" textAlign="center">
          Unite, Code, Create
        </Heading>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {isLoggedIn ? (
            <>
              <RouterLink
                to="/create-project"
                style={{ textDecoration: "none", marginRight: "10px" }}
              >
                <Button colorScheme="green" size="lg">
                  Create session
                </Button>
              </RouterLink>
              <RouterLink to="/join-project" style={{ textDecoration: "none" }}>
                <Button colorScheme="blue" size="lg">
                  Join session
                </Button>
              </RouterLink>
            </>
          ) : (
            <>
              <RouterLink
                to="/login"
                style={{ textDecoration: "none", marginRight: "10px" }}
              >
                <Button colorScheme="green" size="lg">
                  Join session
                </Button>
              </RouterLink>
              <RouterLink to="/login" style={{ textDecoration: "none" }}>
                <Button colorScheme="blue" size="lg">
                  Create session
                </Button>
              </RouterLink>
            </>
          )}
        </div>

      <Text fontSize="md" textAlign="center" marginTop={50}>
        Welcome to CodeCrew!
        <br />
        Unlock the power of collaboration with our advanced, feature-rich coding
        environment. <br />
        Jump right into coding with support for multiple programming languages
        and supercharge your workflow with our versatile editor and plugins.
        <br />
        <br />
        Create or Join Projects: Enter a project code and start collaborating in
        seconds.
        <br />
        <br />
        Ace Interviews: Use our editor to conduct or participate in coding
        interviews seamlessly.
        <br />
        <br />
        Connect & Code: Team up with developers worldwide to bring your ideas to
        life.
        <br />
        <br />
        Code smarter, faster, and together with CodeCrew. Get started now!
      </Text>
      
      <Flex justifyContent="center" mt={10} mb={5}>
          <RouterLink to="/about" style={{ textDecoration: "none", marginRight: "10px" }}>
            <Button colorScheme="teal" size="md">
              About Us
            </Button>
          </RouterLink>
          <RouterLink to="/contact" style={{ textDecoration: "none" }}>
            <Button colorScheme="teal" size="md">
              Contact Us
            </Button>
          </RouterLink>
        </Flex>


      </VStack>
      <Footer />
    </Container>
  );
}

function Footer() {
  return (
    <Flex
      as="footer"
      width="full"
      justifyContent="space-evenly"
      padding="20px"
      mt="20px"
      bg="gray.900"
      marginTop={130}
      marginBottom={5}
    >
      <VStack
        width="100%"
        maxWidth={["100%", "100%", "25%"]}
        spacing={2}
        align="start"
      >
        <Heading size="md">About Us</Heading>
        <RouterLink to="/about">
          <Text _hover={{ textDecoration: "underline" }}>Learn more</Text>
        </RouterLink>
        <Text _hover={{ textDecoration: "underline" }}>Join Discord</Text>
        <Text>Contact Us:</Text>
        <RouterLink to="/contact">
          <Text _hover={{ textDecoration: "underline" }}>info@codecrew.com</Text>
        </RouterLink>
      </VStack>
      <VStack
        width="100%"
        maxWidth={["100%", "100%", "25%"]}
        spacing={2}
        align="start"
      >
        <Heading size="md">Legal</Heading>
        <Text _hover={{ textDecoration: "underline" }}>Terms of Service</Text>
        <Text _hover={{ textDecoration: "underline" }}>Privacy Policy</Text>
      </VStack>
      <VStack
        width="100%"
        maxWidth={["100%", "100%", "25%"]}
        spacing={2}
        align="start"
      >
        <Heading size="md">Languages</Heading>
        <Text _hover={{ textDecoration: "underline" }}>JavaScript</Text>
        <Text _hover={{ textDecoration: "underline" }}>Python</Text>
        <Text _hover={{ textDecoration: "underline" }}>C++</Text>
        <Text _hover={{ textDecoration: "underline" }}>C</Text>
        <Text _hover={{ textDecoration: "underline" }}>Java</Text>
        <Text _hover={{ textDecoration: "underline" }}>Ruby</Text>
        <Text _hover={{ textDecoration: "underline" }}>PHP</Text>
        <Text _hover={{ textDecoration: "underline" }}>more</Text>
      </VStack>
    </Flex>
  );
}

export default Home;
