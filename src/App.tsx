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
import { useState } from "react";

export default interface User {
  Id: number;
  UserName: string;
  Email: string;
  IsAdmin: boolean;
}

export const App = () => {
  const emptyUser: User = {
    Id: 0,
    UserName: "",
    Email: "",
    IsAdmin: false,
  };
  const [user, setUser] = useState<User>(emptyUser);
  return (
    <ChakraProvider theme={theme}>
      <Navbar profile={user} setUser={setUser} />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
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
