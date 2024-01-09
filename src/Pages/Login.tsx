import React, { SyntheticEvent, useState } from "react";
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
}

const Login = ({ user, setUser }: LoginProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const jsonContent = JSON.stringify(formData, null, 2);

    // *Random thought: The password is visible here while it gets transmitted,
    // *should I encrypt the password over here instead of the backend level?

    // Send a request to the API
    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: jsonContent,
    }); // Request is being sent and user is being created :)
    // ! There is no way to allow the user to know if account was successfully created.

    if (response.ok) {
      const content: User = await response.json();

      setIsLoggedIn(true);
      setUser(content);
      console.log(user);
    } else {
      const error = await response.json();
      console.log(error.message);
      setErrors(error);
    }
  };

  return (
    <ChakraProvider>
      <Box p={4} maxW="md" mx="auto">
        <FormControl mt={4} isRequired isInvalid={errors.UserNotFound != null}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.UserNotFound}</FormErrorMessage>
        </FormControl>
        {/*  * Can force strong password */}
        <FormControl mt={4} isRequired isInvalid={errors.WrongPassword != null}>
          {" "}
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.WrongPassword}</FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
          Login
        </Button>
        {isLoggedIn ? <h6>You have been logged in!</h6> : <></>}
      </Box>
    </ChakraProvider>
  );
};

export default Login;
