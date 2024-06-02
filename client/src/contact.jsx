import React, { useEffect } from "react";
import {
  Container,
  VStack,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  Box,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useForm, ValidationError } from "@formspree/react";

function Contact() {
  const [state, handleSubmit] = useForm("mrgnwqyn");
  const toast = useToast();

  useEffect(() => {
    if (state.succeeded) {
      toast({
        title: "Message sent.",
        description: "We will get back to you soon.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [state.succeeded, toast]);

  if (state.succeeded) {
    return (
      <Container maxW="container.md" centerContent>
        <Heading
          fontSize="7xl"
          fontWeight="bold"
          textAlign="center"
          color="white"
        >
          Thank You for Contacting Us!
        </Heading>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" centerContent>
      <VStack
        spacing={8}
        mt={10}
        p={8}
        align="stretch"
        boxShadow="lg"
        borderRadius="lg"
        bg="white"
      >
        <Heading
          fontSize="6xl"
          fontWeight="bold"
          textAlign="center"
          color="black"
        >
          Contact Us
        </Heading>
        <Text fontSize="md" textAlign="center" color="gray.600">
          We'd love to hear from you! Please fill out the form below to get in
          touch with us.
        </Text>
        <Flex direction={["column", "column", "row"]} spacing={5} width="100%">
          <VStack
            as="form"
            spacing={5}
            width={["100%", "100%", "50%"]}
            onSubmit={handleSubmit}
            p={4}
          >
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              focusBorderColor="black"
              borderColor="gray.400"
              size="lg"
              isRequired
              _placeholder={{ color: "gray.500" }}
              color="black"
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
            <Input
              id="surname"
              type="text"
              name="surname"
              placeholder="Surname"
              focusBorderColor="black"
              borderColor="gray.400"
              size="lg"
              isRequired
              _placeholder={{ color: "gray.500" }}
              color="black"
            />
            <ValidationError
              prefix="Surname"
              field="surname"
              errors={state.errors}
            />
            <Input
              id="phone"
              type="tel"
              name="phone"
              placeholder="Phone"
              focusBorderColor="black"
              borderColor="gray.400"
              size="lg"
              isRequired
              _placeholder={{ color: "gray.500" }}
              color="black"
            />
            <ValidationError
              prefix="Phone"
              field="phone"
              errors={state.errors}
            />
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              focusBorderColor="black"
              borderColor="gray.400"
              size="lg"
              isRequired
              _placeholder={{ color: "gray.500" }}
              color="black"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <Textarea
              id="message"
              name="message"
              placeholder="Your Message"
              focusBorderColor="black"
              borderColor="gray.400"
              size="lg"
              isRequired
              _placeholder={{ color: "gray.500" }}
              color="black"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={state.submitting}
              size="lg"
              width="full"
            >
              Send Message
            </Button>
          </VStack>
          <Box
            height="300px"
            width={["100%", "100%", "50%"]}
            bg="gray.100"
            mt={[5, 5, 0]}
            ml={[0, 0, 5]}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
          >
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
        </Flex>
      </VStack>
    </Container>
  );
}

export default Contact;
