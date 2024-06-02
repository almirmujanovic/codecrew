import React from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Container,
  Flex,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "./components/AuthContext";

function Home() {
  const { auth } = useAuth();
  const isLoggedIn = !!auth.userId;

  return (
    <Container maxW="container.xxl" centerContent>
      <VStack spacing={70} mt={10} p={5} align="stretch">
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
      </VStack>

      <Text fontSize="md" textAlign="center" marginTop={100}>
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

      <Flex
        as="footer"
        width="full"
        justifyContent="space-evenly"
        padding="20px"
        mt="20px"
        bg="gray.900"
        marginTop={200}
        marginBottom={5}
      >
        <VStack
          width="100%"
          maxWidth={["100%", "100%", "25%"]}
          spacing={2}
          align="start"
        >
          <Heading size="md">About Us</Heading>
          <Text _hover={{ textDecoration: "underline" }}>Learn more </Text>
          <Text _hover={{ textDecoration: "underline" }}>Join Discord</Text>
          <Text>Contact Us:</Text>
          <Text>info@codecrew.com</Text>
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
        <VStack
          width="100%"
          maxWidth={["100%", "100%", "25%"]}
          spacing={2}
          align="start"
        >
          <Heading size="md">HQ</Heading>
          <Box height="200px" width="100%" bg="gray.300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5720.736875007957!2d17.89267169357909!3d44.1994776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475ee24259b7e2c9%3A0xbbbe13ba46b02200!2sCampus%20of%20University%20of%20Zenica!5e0!3m2!1sen!2sba!4v1716986412913!5m2!1sen!2sba"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>
        </VStack>
      </Flex>
    </Container>
  );
}

export default Home;
