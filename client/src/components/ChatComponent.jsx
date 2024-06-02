import React from "react";
import { Box, Button, Input, VStack, HStack, Text } from "@chakra-ui/react";

const ChatComponent = ({
  onClose,
  messages,
  newMessage,
  setNewMessage,
  sendMessage,
}) => {
  console.log("Rendering ChatComponent with messages:", messages);

  return (
    <Box
      position="fixed"
      bottom="0"
      right="0"
      width="300px"
      height="80vh"
      bg="gray.700"
      p={4}
      borderRadius="md"
      boxShadow="lg"
    >
      <VStack spacing={4} align="stretch" height="100%">
        <Box display="flex" justifyContent="space-between" width="100%">
          <Text fontSize="lg" fontWeight="bold" color="white">
            Chat
          </Text>
          <Button size="sm" onClick={onClose}>
            X
          </Button>
        </Box>
        <Box flex="1" overflowY="auto" bg="gray.800" p={2} borderRadius="md">
          {messages.map((msg, index) => (
            <HStack key={index} spacing={2}>
              <Text fontWeight="bold" color="white">
                {msg.username}:
              </Text>
              <Text color="white">{msg.text}</Text>
            </HStack>
          ))}
        </Box>
        <HStack>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage}>Send</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ChatComponent;
