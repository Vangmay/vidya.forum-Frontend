import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Textarea,
  Select,
  Button,
  Center,
  Avatar,
  Flex,
  Heading,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { HOST_URL } from "../App";

const PostForm = ({ user }: { user: any }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("");
  const [openCreateForm, setOpenCreateForm] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const response = await fetch(`${HOST_URL}/post`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, body, tag }),
    });

    if (response.ok) {
      console.log("Post created");
      window.location.reload();
    } else {
      console.error("Failed to create post");
    }
  }

  let main = openCreateForm ? (
    <>
      <Center>
        <Heading as="h2">Create a post</Heading>
      </Center>
      <Center mt="4" padding="10px">
        <form onSubmit={handleSubmit}>
          <Input
            mb="4"
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            mb="4"
            name="body"
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Select
            mb="4"
            name="tag"
            placeholder="Select a Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            // ! Link the options here and in the view
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="Computer Science">Computer Science</option>
          </Select>
          <Box display={"flex"} gap={"10px"} width="xl">
            <Button type="submit" colorScheme="teal">
              Create Post
            </Button>
            <Button onClick={() => setOpenCreateForm(false)} colorScheme="teal">
              Close
            </Button>
          </Box>
        </form>
      </Center>
    </>
  ) : (
    <Center>
      <Flex
        flex="1"
        gap="4"
        alignItems="center"
        flexWrap="wrap"
        direction="column"
      >
        <Flex
          flex="1"
          gap="4"
          alignItems="center"
          flexWrap="wrap"
          direction="column"
        >
          <Avatar name={user.userName} size="md" margin={"0"} />
          <Heading size="sm">{user.userName}</Heading>
          <Heading>Hello there! 👋 Click on Create post to get started</Heading>
        </Flex>
        <Input
          w="xl"
          name="Create post"
          placeholder="Create post"
          value={body}
          onClick={() => setOpenCreateForm(true)}
          size="md"
          borderRadius="12px"
        ></Input>
      </Flex>
    </Center>
  );

  return (
    // {openCreateForm ? }
    <div>{main}</div>
  );
};

export default PostForm;
