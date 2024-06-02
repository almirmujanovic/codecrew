import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useAuth } from "./components/AuthContext";

const socket = io("http://localhost:8080");

function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("Normal");
  const [duration, setDuration] = useState("");
  const bgColor = useColorModeValue("#1B1A55", "#1B1A55");
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { userId, username } = auth;

  const handleCreateProject = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/projects/create",
        {
          name: projectName,
          description,
          userId,
          username,
          type: projectType,
          duration: projectType === "Interview" ? duration : null,
        }
      );
      const { projectId } = response.data;
      socket.emit("create_room", { roomId: projectId, userId, username });
      socket.on("room_created", (room) => {
        console.log(`Room created: ${room}`);
        navigate(`/${room}`);
      });
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Failed to create project");
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
        <Heading>Create New Project</Heading>
        <FormControl isRequired>
          <FormLabel>Project Name</FormLabel>
          <Input
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Describe your project"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Project Type</FormLabel>
          <Select
            placeholder="Select project type"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
          >
            <option value="Normal">Normal</option>
            <option value="Interview">Interview</option>
          </Select>
        </FormControl>
        {projectType === "Interview" && (
          <FormControl isRequired>
            <FormLabel>Duration</FormLabel>
            <Input
              placeholder="Enter duration (e.g., 1h 30m)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </FormControl>
        )}
        <Button
          colorScheme="teal"
          width="full"
          mt="4"
          onClick={handleCreateProject}
        >
          Create Project
        </Button>
      </VStack>
    </Box>
  );
}

export default CreateProject;
