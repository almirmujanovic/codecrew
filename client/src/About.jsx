import React from "react";
import { Container, VStack, Heading, Text, Box } from "@chakra-ui/react";

function About() {
  return (
    <Container maxW="container.lg" centerContent>
      <Box p={5} borderRadius="md" boxShadow="">
        <VStack spacing={5} mt={10} align="stretch">
          <Heading fontSize="4xl" fontWeight="bold" textAlign="center">
            About Us
          </Heading>
          <Text fontSize="md" textAlign="left">
            CodeCrew was born out of a passion for coding and a vision to create a
            collaborative platform for developers worldwide. Our journey began in
            a small co-working space where a group of enthusiastic coders realized
            the power of collective intelligence and teamwork.
          </Text>
          <Text fontSize="md" textAlign="left">
            As we worked on various projects together, we encountered the
            challenges of remote collaboration and the limitations of existing
            tools. This inspired us to create CodeCrew – a platform designed to
            bridge the gap between coders, offering a seamless and efficient
            environment to unite, code, and create.
          </Text>
          <Text fontSize="md" textAlign="left">
            Our mission is to empower developers to collaborate effortlessly,
            share knowledge, and innovate together. We believe that by fostering a
            community-driven approach, we can unlock the full potential of every
            coder, leading to the creation of remarkable software and solutions.
          </Text>
          <Text fontSize="md" textAlign="left">
            Join us on this exciting journey and be a part of a community that
            celebrates creativity, collaboration, and continuous learning. Welcome
            to CodeCrew!
          </Text>
        </VStack>
      </Box>
    </Container>
  );
}

export default About;
