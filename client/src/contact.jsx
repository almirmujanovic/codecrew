import React, { useState } from "react";
import { Container, VStack, Heading, Text, Input, Textarea, Button, Box, Flex, useToast } from "@chakra-ui/react";
import axios from "axios";

function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/contact", { email, message });
      if (response.status === 200) {
        toast({
          title: "Message sent.",
          description: "We will get back to you soon.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setEmail("");
        setMessage("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to send message. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxW="container.md" centerContent>
      <VStack spacing={5} mt={10} p={5} align="stretch">
        <Heading fontSize="4xl" fontWeight="bold" textAlign="center">
          Contact Us
        </Heading>
        <Text fontSize="md" textAlign="left">
          We'd love to hear from you! Please fill out the form below to get in
          touch with us.
        </Text>
        <Flex direction={["column", "column", "row"]} spacing={5} width="100%">
          <VStack as="form" spacing={5} width={["100%", "100%", "50%"]} onSubmit={handleSubmit}>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
            />
            <Textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              isRequired
            />
            <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
              Send Message
            </Button>
          </VStack>
          <Box height="300px" width={["100%", "100%", "50%"]} bg="gray.300" mt={[5, 5, 0]} ml={[0, 0, 5]}>
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
