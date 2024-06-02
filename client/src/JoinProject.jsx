import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useAuth } from "./components/AuthContext";

const socket = io("http://localhost:8080");

function JoinProject() {
  const [roomCode, setRoomCode] = useState("");
  const bgColor = useColorModeValue("#1B1A55", "#1B1A55");
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { userId, username } = auth;

  const handleJoinProject = async () => {
    try {
      await axios.post("http://localhost:8080/projects/join", {
        projectId: roomCode,
        userId,
      });

      socket.emit("join_room", { roomId: roomCode, userId, username });
      socket.on("room_joined", (room) => {
        console.log(`Joined room: ${room}`);
        navigate(`/${room}`);
      });
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Error joining project");
        console.error(error);
      }
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
        spacing={4}
        p={8}
        bg="#070F2B"
        boxShadow="md"
        rounded="md"
        maxWidth="400px"
        width="100%"
        color="white"
      >
        <Heading>Join a Project</Heading>
        <FormControl isRequired>
          <FormLabel>Project Code</FormLabel>
          <Input
            placeholder="Enter project code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          width="full"
          mt="4"
          onClick={handleJoinProject}
        >
          Join Project
        </Button>
      </VStack>
    </Box>
  );
}

export default JoinProject;
