import React, { SyntheticEvent, useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import User from "../App";

type FormData = {
  email: string;
  password: string;
};

interface LoginProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ user, setUser, isLoggedIn, setIsLoggedIn }: LoginProps) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const content: User = await response.json();
      console.log("content", content);
      setUser(content);
      setIsLoggedIn(true); // You might want to update this based on your actual authentication logic
    } else {
      const error = await response.json();
      console.log(error.message);
      setErrors(error);
    }

    // Assuming content is an object with user details

    console.log(user);
  };
  console.log(user);
  useEffect(() => {
    console.log("user updated", user);
  }, [user]);

  return (
    <ChakraProvider>
      <Box p={4} maxW="md" mx="auto">
        <form onSubmit={handleSubmit}>
          <FormControl
            mt={4}
            isRequired
            isInvalid={errors.UserNotFound != null}
          >
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormErrorMessage>{errors.UserNotFound}</FormErrorMessage>
          </FormControl>
          {/*  * Can force strong password */}
          <FormControl
            mt={4}
            isRequired
            isInvalid={errors.WrongPassword != null}
          >
            {" "}
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage>{errors.WrongPassword}</FormErrorMessage>
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Login
          </Button>
        </form>

        {isLoggedIn ? <h6>You have been logged in!</h6> : <></>}
      </Box>
    </ChakraProvider>
  );
};

export default Login;
