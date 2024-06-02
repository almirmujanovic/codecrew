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
import { useAuth } from "./components/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const bgColor = useColorModeValue("#1B1A55", "#1B1A55");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        username,
        password,
      });

      login(response.data.token, response.data.username, response.data.userId);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Login failed! Check your username and password.");
      console.error("Login error:", error.response || error);
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
        onSubmit={handleLogin}
        spacing={4}
        p={8}
        bg="#070F2B"
        boxShadow="md"
        rounded="md"
        maxWidth="400px"
        width="100%"
      >
        <Heading size="lg">Login</Heading>
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
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" width="full" mt={4} type="submit">
          Log In
        </Button>
        <Text mt={6}>
          Don't have an account?{" "}
          <Link color="teal.500" href="/register">
            Sign up!
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}

export default Login;
