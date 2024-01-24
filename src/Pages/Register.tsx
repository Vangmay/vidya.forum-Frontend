import React, { SyntheticEvent, useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Center,
  Text,
  Link,
  Heading,
} from "@chakra-ui/react";
import { HOST_URL } from "../App";

type FormData = {
  username: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const jsonContent = JSON.stringify({ username, email, password });

    // *Random thought: The password is visible here while it gets transmitted,
    // *should I encrypt the password over here instead of the backend level?

    // Send a request to the API
    const response = await fetch(`${HOST_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: jsonContent,
    }); // Request is being sent and user is being created :)
    // ! There is no way to allow the user to know if account was successfully created.

    if (response.ok) {
      const content = await response.json();
      console.log(content);
    } else {
      const error = await response.json();
      console.log(error.message);
      setErrors(error);
    }
  };

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
        <Heading mb={6}>Register</Heading>

        <form onSubmit={handleSubmit}>
          <FormControl
            mt={4}
            isRequired
            isInvalid={errors.UsernameConflict != null}
          >
            <Input
              placeholder="Username"
              variant="filled"
              mb={3}
              rounded="md"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormErrorMessage>{errors.UsernameConflict}</FormErrorMessage>
          </FormControl>

          <FormControl
            mt={4}
            isRequired
            isInvalid={errors.EmailConflict != null}
          >
            <Input
              type="email"
              name="email"
              placeholder="Batman@gmail.com"
              variant="filled"
              mb={3}
              rounded="md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormErrorMessage>{errors.EmailConflict}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isRequired>
            <Input
              type="password"
              name="password"
              variant="filled"
              mb={3}
              rounded="md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Center>
            <Button colorScheme="teal" type="submit">
              Register
            </Button>
          </Center>
          <Text>Already have an account? </Text>
          <Link href="/login">
            <Text as="b">Login here</Text>
          </Link>
        </form>
      </Box>
    </Flex>
  );
};

export default Register;

// Write a form, that asks for the users preferred USERNAME, Email and password
// Possibilities, USERNAME and email are both unique, user is registered succesfully
//  Email is not unique: Prompt the user and inform that email is not unique
// Username is not unique: prompt the user and inform that the username is not unique
