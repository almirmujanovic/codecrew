import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const bgColor = useColorModeValue("#1B1A55", "#1B1A55");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/users/register",
        {
          email,
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/login");
      alert("Registration successful!");
    } catch (error) {
      alert("Registration failed!");
      console.error("There was an error registering the user:", error.response);
    }
  };

  return (
    <Box
      bg={bgColor}
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        as="form"
        onSubmit={handleRegister}
        spacing={4}
        p={8}
        bg="#070F2B"
        boxShadow="md"
        rounded="md"
        maxWidth="400px"
        width="100%"
      >
        <Heading size="lg">Register</Heading>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Enter your username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Create a password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            placeholder="Confirm your password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="orange" width="full" mt={4} type="submit">
          Sign Up
        </Button>
        <Text mt={6}>
          Already have an account?{" "}
          <Link color="orange.500" href="/login">
            Log in!
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}

export default Register;
