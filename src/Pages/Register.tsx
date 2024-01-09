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

type FormData = {
  username: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    const response = await fetch("http://localhost:8000/auth/register", {
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
    <ChakraProvider>
      <Box p={4} maxW="md" mx="auto">
        <FormControl isRequired isInvalid={errors.UsernameConflict != null}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.UsernameConflict}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isRequired isInvalid={errors.EmailConflict != null}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.EmailConflict}</FormErrorMessage>
        </FormControl>

        {/*  * Can force strong password */}
        <FormControl mt={4} isRequired>
          {" "}
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>

        <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
          Register
        </Button>
      </Box>
    </ChakraProvider>
  );
};

export default Register;

// Write a form, that asks for the users preferred USERNAME, Email and password
// Possibilities, USERNAME and email are both unique, user is registered succesfully
//  Email is not unique: Prompt the user and inform that email is not unique
// Username is not unique: prompt the user and inform that the username is not unique
