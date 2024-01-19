import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Textarea,
  Select,
  Button,
  Center,
} from "@chakra-ui/react";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("");
  const [openCreateForm, setOpenCreateForm] = useState(false);

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

  let main = openCreateForm ? (
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
        <Box display={"flex"} gap={"10px"}>
          <Button type="submit" colorScheme="teal">
            Create Post
          </Button>
          <Button onClick={() => setOpenCreateForm(false)} colorScheme="teal">
            Close
          </Button>
        </Box>
      </form>
    </Center>
  ) : (
    <Center>
      <Textarea
        mb="4"
        w={"75vw"}
        name="Create post"
        placeholder="Create post"
        value={body}
        onClick={() => setOpenCreateForm(true)}
      ></Textarea>
    </Center>
  );

  return (
    // {openCreateForm ? }
    <div>{main}</div>
  );
};

export default PostForm;
