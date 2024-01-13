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

interface EditProps {
  post: any;
}
function EditPostForm({ post }: EditProps) {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [tag, setTag] = useState(post.tag);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/post/${post.id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, body, tag }),
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
          Edit post
        </Button>
      </form>
    </Box>
  );
}

export default EditPostForm;
