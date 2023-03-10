import React from "react";
import {
  ChakraProvider,
  extendTheme,
  cookieStorageManager,
  localStorageManager,
} from "@chakra-ui/react";

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const semanticTokens = {
  colors: {
    primary: "#4fb069",
    primaryDark: "#25c2a0",
    brand: {
      50: "#F7FAFC",
      100: "#2B6CB0",
      200: "#63B3ED",
      300: "#FBD38D",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#171923",
    },
  },
};

const components = {
  Button: {
    sizes: {
      xl: {
        h: "56px",
        fontSize: "xl",
        px: "32px",
      },
    },
  },
};

// 3. Extend the theme
const theme = extendTheme({
  breakpoints,
  config,
  components,
  ...semanticTokens,
});

// Default implementation, that you can customize
export default function Root({ children, cookies }) {
  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManager(cookies)
      : localStorageManager;

  return (
    <ChakraProvider
      colorModeManager={colorModeManager}
      theme={theme}
      resetCSS={false}
    >
      {children}
    </ChakraProvider>
  );
}
