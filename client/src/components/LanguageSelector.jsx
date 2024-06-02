import {
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { languageVersions } from "../constants";

const languages = Object.entries(languageVersions);

function LanguageSelector({ language, onSelect }) {
  return (
    <Box ml={2} mb={4}>
      <Text mb={2} fontSize="lg">
        Language:
      </Text>
      <Menu isLazy>
        <MenuButton as={Button}>{language}</MenuButton>
        <MenuList>
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              color={lang === language ? "blue.500" : ""}
              bg={lang === language ? "gray.900" : ""}
              _hover={{
                bg: "gray.900",
                color: "blue.500",
              }}
              onClick={() => onSelect(lang)}
            >
              {lang}
              &nbsp;
              <Text as="span" color="gray.600">
                ({version})
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
}

export default LanguageSelector;
