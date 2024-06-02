import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  HStack,
  Button,
  Text,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { languageTemplates, languageIDs } from "../constants";
import Output from "./Output";
import SideMenu from "./SideMenu";
import ChatComponent from "./ChatComponent";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CodeEditor() {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("cpp");
  const socket = useRef(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { auth } = useAuth();
  const { username, userId } = auth;
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const { roomId } = useParams();
  const { hasCopied, onCopy } = useClipboard(roomId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/projects/${roomId}/isAdmin/${username}`
        );
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error("Failed to check admin status", error);
      }
    };

    checkAdminStatus();
  }, [roomId, username]);

  useEffect(() => {
    socket.current = io("http://localhost:8080");

    socket.current.emit("join_room", { roomId, userId, username });

    socket.current.on("code_update", (newCode) => {
      console.log("Received code update:", newCode);
      setValue(newCode);
    });

    socket.current.on("users_update", (updatedUsers) => {
      console.log("Users update:", updatedUsers);
      const uniqueUsers = updatedUsers.filter(
        (user, index, self) =>
          index === self.findIndex((u) => u.userId === user.userId)
      );
      console.log("Unique users:", uniqueUsers);
      setUsers(uniqueUsers);
    });

    socket.current.on("session_ended", () => {
      navigate("/");
    });

    socket.current.on("banned", () => {
      navigate("/");
    });

    socket.current.on("message", (message) => {
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.current.off("code_update");
      socket.current.off("users_update");
      socket.current.off("session_ended");
      socket.current.off("banned");
      socket.current.off("message");
      socket.current.disconnect();
    };
  }, [roomId, navigate, userId, username]);

  const onSelect = (language) => {
    setLanguage(language);
    const template = languageTemplates[language];
    setValue(template);
    socket.current.emit("code_change", { room: roomId, code: template });
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleEditorChange = (newValue) => {
    console.log("Editor changed:", newValue);
    setValue(newValue);
    socket.current.emit("code_change", { room: roomId, code: newValue });
  };

  const handleBanUser = (userIdToBan) => {
    socket.current.emit("ban_user", { roomId, userIdToBan });
  };

  const handleEndSession = async () => {
    try {
      await axios.post("http://localhost:8080/projects/stop", {
        projectId: roomId,
        languageId: languageIDs[language],
      });
    } catch (error) {
      console.error("Failed to stop the session", error);
    }
    socket.current.emit("end_session", { roomId });
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = { username, text: newMessage, roomId };
      console.log("Sending message:", message);
      socket.current.emit("send_message", message);
      setNewMessage("");
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={onOpen}>Info</Button>
      </Box>
      <Box textAlign="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Room ID: {roomId}
        </Text>
        <Button onClick={onCopy}>
          {hasCopied ? "Copied" : "Copy Room ID"}
        </Button>
      </Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            height="75vh"
            theme="vs-dark"
            language={language}
            onMount={onMount}
            value={value}
            onChange={handleEditorChange}
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </HStack>

      <SideMenu
        isOpen={isOpen}
        onClose={onClose}
        users={users}
        isAdmin={isAdmin}
        userId={userId}
        handleBanUser={handleBanUser}
        handleEndSession={handleEndSession}
      />

      {isChatOpen && (
        <ChatComponent
          onClose={() => setIsChatOpen(false)}
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
        />
      )}

      {!isChatOpen && (
        <Button
          position="fixed"
          bottom="10px"
          right="10px"
          onClick={() => setIsChatOpen(true)}
        >
          Chat
        </Button>
      )}
    </Box>
  );
}

export default CodeEditor;
