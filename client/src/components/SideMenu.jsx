import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  List,
  ListItem,
  Text,
  Box,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const SideMenu = ({
  isOpen,
  onClose,
  users,
  isAdmin,
  userId,
  handleBanUser,
  handleEndSession,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [userToBan, setUserToBan] = useState(null);
  const cancelRef = React.useRef();

  const onBanClick = (user) => {
    setUserToBan(user);
    setIsAlertOpen(true);
  };

  const confirmBanUser = () => {
    if (userToBan) {
      handleBanUser(userToBan.userId);
      handleBanUser(userToBan.userId);
      setIsAlertOpen(false);
      setUserToBan(null);
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>User List</DrawerHeader>
          <DrawerBody>
            <List spacing={3}>
              {users.map((user) => (
                <ListItem
                  key={user.userId}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Text>
                      {user.username} ({user.userId})
                    </Text>
                  </Box>
                  {isAdmin && userId !== user.userId && (
                    <Button
                      ml={4}
                      colorScheme="red"
                      size="sm"
                      onClick={() => onBanClick(user)}
                    >
                      Ban
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          </DrawerBody>
          {isAdmin && (
            <DrawerFooter>
              <Button colorScheme="red" onClick={handleEndSession}>
                End Session
              </Button>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Ban
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to ban {userToBan?.username} (
              {userToBan?.userId})?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmBanUser} ml={3}>
                Ban
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default SideMenu;
