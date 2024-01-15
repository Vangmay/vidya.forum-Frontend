import React, { SyntheticEvent, useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Flex,
  Text,
  Link,
  Center,
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
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      bgImage="url('/Login.jpg')" // ! Why is the image not displaying???
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Box
        p={8}
        bg="rgba(255, 255, 255, 0.3)"
        // borderRadius={"750px"}
        padding={"50px"}
        rounded={"10px"}
        backdropFilter={"blur(5px)"}
      >
        <Heading mb={6}>Login</Heading>

        <form onSubmit={handleSubmit}>
          <FormControl
            mt={4}
            isRequired
            isInvalid={errors.UserNotFound != null}
          >
            <Input
              placeholder="Email"
              variant="filled"
              mb={3}
              rounded="md"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormErrorMessage>{errors.UserNotFound}</FormErrorMessage>
          </FormControl>

          <FormControl
            mt={4}
            isRequired
            isInvalid={errors.WrongPassword != null}
          >
            <Input
              type="password"
              name="password"
              placeholder="Password"
              variant="filled"
              mb={3}
              rounded="md"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage>{errors.WrongPassword}</FormErrorMessage>
          </FormControl>
          <Center>
            <Button colorScheme="teal" type="submit">
              Log In
            </Button>
          </Center>
          <Text>Don't have an acccount?</Text>
          <Link href="/register">
            <Text as="b">Register here</Text>
          </Link>
          {isLoggedIn ? <h6>You have been logged in!</h6> : <></>}
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
