import * as React from "react";
import {
  Flex,
  Box,
  Text,
  ImageProps,
  Image,
  BoxProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

export type SplitCardProps = {
  title: string;
  subText: string | React.ReactElement;
  imagePath?: string;
  imageProps?: ImageProps;
  type?: "primary" | "secondary";
  mirror?: boolean;
} & BoxProps;

export function SplitCard({
  title,
  subText,
  imagePath,
  imageProps,
  mirror,
  type,
  children,
  ...rest
}: SplitCardProps) {
  const { toggleColorMode } = useColorMode();
  const isPrimary = type === "primary";
  const bg = useColorModeValue(
    isPrimary ? "primary" : "white",
    isPrimary ? "primaryDark" : "gray.800"
  );
  const color = useColorModeValue(
    isPrimary ? "white" : "gray.800",
    isPrimary ? "gray.800" : "white"
  );
  return (
    <Flex
      bg={bg}
      padding={{ base: "1.5rem", md: "2rem" }}
      width={"100%"}
      flexDirection={{
        base: "column",
        sm: "column",
        md: mirror ? "row-reverse" : "row",
      }}
      color={color}
      justifyContent="center"
      alignItems={"center"}
      {...rest}
    >
      <Box m="10">
        <Text as="h2" fontSize={"4xl"} fontWeight="bold">
          {title}
        </Text>
        {typeof subText === "string" ? (
          <Text as="p" fontSize={"2xl"}>
            {subText}
          </Text>
        ) : (
          subText
        )}
      </Box>
      {children ? (
        children
      ) : (
        <Box>
          <Image {...imageProps} src={imagePath} />
        </Box>
      )}
    </Flex>
  );
}
