import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Spacer,
  Button,
  Heading,
  Link,
} from "@chakra-ui/react";
import User, { HOST_URL } from "../App";
import Home from "../Pages/Home";

interface NavBarProps {
  profile: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const emptyUser: User = {
  Id: 0,
  UserName: "",
  Bio: "",
  Email: "",
  IsAdmin: false,
};
const Navbar: React.FC<NavBarProps> = ({
  profile,
  setUser,
  isLoggedIn,
  setIsLoggedIn,
}: NavBarProps) => {
  const logout = async () => {
    console.log(" logout running");
    const response = await fetch(`${HOST_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    console.log("response");
    console.log(await response.json());
    setUser(emptyUser);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    console.log("user updated in navbar", profile);
  }, [profile]);

  let menu;

  if (profile.UserName != "") {
    menu = (
      <>
        <Link href="/">
          <Button colorScheme="teal" mr={4}>
            Home
          </Button>
        </Link>
        <Link href="/profile">
          <Button colorScheme="teal" mr={4}>
            Profile
          </Button>
        </Link>
        <Button colorScheme="teal" mr={4} onClick={() => logout()}>
          Logout
        </Button>
      </>
    );
  } else {
    menu = (
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
  }

  return (
    <Flex p={4} bg="teal.500" color="white">
      <Box p="2">
        <Heading size="md">📝Vidya.forum</Heading>
      </Box>
      <Spacer />
      <Box>
        <>{menu}</>
      </Box>
    </Flex>
  );
};

export default Navbar;
