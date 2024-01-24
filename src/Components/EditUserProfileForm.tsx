import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";
import { postProps } from "./SinglePost";
import { HOST_URL } from "../App";

interface Props {
  currentUser: any;
}
function EditUserProfileForm({ currentUser }: Props) {
  const [userName, setUsername] = useState(currentUser.userName);
  const [email, setEmail] = useState(currentUser.email);
  const [bio, setBio] = useState(currentUser.bio);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const response = await fetch(`${HOST_URL}/auth/profile`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userName, email, bio }),
    });

    if (response.ok) {
      console.log("Post edited");
      window.location.reload();
    } else {
      console.error("Failed to edit post");
    }
  }

  return (
    <Box maxW="500px" m="auto" mt="4">
      <form onSubmit={handleSubmit}>
        <Input
          mb="4"
          type="text"
          name="username"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Textarea
          mb="4"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Textarea
          mb="4"
          name="bio"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <Button type="submit" colorScheme="teal">
          Edit Profile
        </Button>
      </form>
    </Box>
  );
}

export default EditUserProfileForm;
