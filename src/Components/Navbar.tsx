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
import User from "../App";
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
    const response = await fetch("http://localhost:8000/auth/logout", {
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

  // if (profile.UserName === "") {
  //   menu = (
  //     <ul className="navbar-nav me-auto mb-2 mb-md-0">
  //       <li className="nav-item active">
  //         <Link to="/login" className="nav-link">
  //           Login
  //         </Link>
  //       </li>
  //       <li className="nav-item active">
  //         <Link to="/register" className="nav-link">
  //           Register
  //         </Link>
  //       </li>
  //     </ul>
  //   );
  // } else {
  //   menu = (
  //     <ul className="navbar-nav me-auto mb-2 mb-md-0">
  //       <li className="nav-item active">
  //         <Link to="/" className="nav-link" onClick={logout}>
  //           Logout
  //         </Link>
  //       </li>
  //     </ul>
  //   );
  // }

  return (
    <Flex p={4} bg="teal.500" color="white">
      <Box p="2">
        <Heading size="md">Your Logo</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link href="/">
          <Button colorScheme="teal" mr={4}>
            Home
          </Button>
        </Link>
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
          <Button colorScheme="teal" mr={4} onClick={() => logout()}>
            Logout
          </Button>
        </>
      </Box>
    </Flex>
  );
};

export default Navbar;
