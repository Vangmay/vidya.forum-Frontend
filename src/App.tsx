import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar";
import { useState, useEffect } from "react";

export default interface User {
  Id: number;
  UserName: string;
  Email: string;
  IsAdmin: boolean;
}

export const App = () => {
  console.log("Running app");
  const emptyUser: User = {
    Id: 0,
    UserName: "",
    Email: "",
    IsAdmin: false,
  };

  const [user, setUser] = useState<User>(emptyUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect(() => {
  //   console.log("user updated", user);
  // }, [user]);
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/auth/profile", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();

      setUser(content);
    })();
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Navbar
        profile={user}
        setUser={setUser}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={() => <Home user={user} />} />
          <Route
            path="/login"
            Component={() => <Login user={user} setUser={setUser} />}
          />
          <Route path="/register" Component={Register} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};
