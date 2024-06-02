import { background, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: 'vt323',
    body: 'system-ui, sans-serif', // This is for body text
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
    background: "red"
  },
});

export default theme;
