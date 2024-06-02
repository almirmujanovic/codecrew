import { Box, Text, Button, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { useState } from "react";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const response = await executeCode(sourceCode, language);
      setOutput(response.run.output);
      response.run.stderr ? setIsError(true) : setIsError(false);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "An error occurred while running the code",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        <Text whiteSpace="pre-wrap">
          {output ? output : 'Click "Run Code" to see the output here'}
        </Text>
      </Box>
    </Box>
  );
};

export default Output;
