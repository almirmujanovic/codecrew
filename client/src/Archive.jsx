import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  List,
  ListItem,
  ListIcon,
  Button,
  HStack,
  Tag,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import axios from "axios";
import { useAuth } from "./components/AuthContext";

function Archive() {
  const [archivedProjects, setArchivedProjects] = useState([]);
  const [filter, setFilter] = useState("");
  const { auth } = useAuth();
  const { userId } = auth;

  const fetchProjects = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/projects/user/${userId}/projects`
      );
      setArchivedProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch user projects", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const filters = ["Recent", "My Projects", "Shared with Me"];

  const filteredProjects = archivedProjects.filter((project) =>
    project.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <VStack spacing={4} p={8}>
      <Heading>Archived Projects</Heading>
      <Text>
        If you need to revisit old projects, here’s a list of what you’ve
        completed.
      </Text>
      <HStack spacing={4}>
        {filters.map((filterName) => (
          <Button
            key={filterName}
            colorScheme="blue"
            onClick={() => setFilter(filterName)}
          >
            {filterName}
          </Button>
        ))}
      </HStack>
      <Input
        placeholder="Filter projects..."
        my={4}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <List spacing={3} width="full">
        {filteredProjects.map((project) => {
          const uniqueUsers = Array.from(
            new Map(project.users.map((user) => [user.user_id, user])).values()
          );
          return (
            <ListItem
              key={project.project_id}
              p={4}
              boxShadow="md"
              bg="#070F2B"
            >
              <HStack spacing={4} alignItems="center">
                <ListIcon as={MdCheckCircle} color="green.500" />
                <Box flex="1">
                  <Text fontWeight="bold">{project.name}</Text>
                  <Text fontSize="sm">{project.description}</Text>
                  <Tag size="sm" colorScheme="gray" mr={2}>
                    {project.language_name}
                  </Tag>
                  <Tag size="sm" colorScheme="cyan" mr={2}>
                    {project.admin}
                  </Tag>
                  {uniqueUsers.map((user) => (
                    <Tag key={user.user_id} size="sm" colorScheme="purple">
                      {user.username}
                    </Tag>
                  ))}
                </Box>
                <Button size="sm" colorScheme="blue">
                  View Details
                </Button>
              </HStack>
            </ListItem>
          );
        })}
      </List>
    </VStack>
  );
}

export default Archive;
