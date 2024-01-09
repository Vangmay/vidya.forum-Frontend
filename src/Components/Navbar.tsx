import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Spacer,
  Button,
  Heading,
  Link,
} from "@chakra-ui/react";
import User from "../App";

interface NavBarProps {
  profile: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const Navbar: React.FC<NavBarProps> = ({ profile, setUser }: NavBarProps) => {
  const logout = async () => {
    const response = await fetch("http://localhost:8000/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    console.log(await response.json());

    setUser({
      Id: 0,
      UserName: "",
      Email: "",
      IsAdmin: false,
    });
  };

  let AuthOptions;
  if (profile.UserName === "") {
    AuthOptions = (
      <>
        <Link href="/login">
          <Button colorScheme="teal" mr={4}>
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button colorScheme="teal" mr={4}>
            Register
          </Button>
        </Link>
      </>
    );
  } else {
    AuthOptions = (
      <Button colorScheme="teal" mr={4} onClick={logout}>
        Logout
      </Button>
    );
  }

  return (
    <Flex p={4} bg="teal.500" color="white">
      <Box p="2">
        <Heading size="md">Your Logo</Heading>
      </Box>
      <Spacer />
      <Box>{AuthOptions}</Box>
    </Flex>
  );
};

export default Navbar;
