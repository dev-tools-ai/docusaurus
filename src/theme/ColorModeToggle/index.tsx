import React, { useEffect } from "react";
import ColorModeToggle from "@theme-original/ColorModeToggle";
import { useColorMode } from "@chakra-ui/react";

type ColorModeToggleWrapperProps = {
  className: string;
  onChange: (newColorMode: "dark" | "light") => void;
  value: "dark" | "light";
};
export default function ColorModeToggleWrapper(
  props: ColorModeToggleWrapperProps
) {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode(props.value);
  }, [props.value]);

  return (
    <>
      <ColorModeToggle {...props} />
    </>
  );
}
