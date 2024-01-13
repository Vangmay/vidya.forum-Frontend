import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/post", {
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

  return (
    <Box maxW="500px" m="auto" mt="4">
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
        <Button type="submit" colorScheme="teal">
          Create Post
        </Button>
      </form>
    </Box>
  );
};

export default PostForm;
