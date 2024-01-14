import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";

const CreateCommentForm = ({ post }: { post: any }) => {
  const [content, setContent] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/comment/${post.id}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content }),
    });

    if (response.ok) {
      console.log("Comment created");
      window.location.reload();
    } else {
      console.error("Failed to create comment");
    }
  }

  return (
    <Box maxW="500px" m="auto" mt="4">
      <form onSubmit={handleSubmit}>
        <Textarea
          mb="4"
          name="body"
          placeholder="Body"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit" colorScheme="teal">
          Create Comment
        </Button>
      </form>
    </Box>
  );
};

export default CreateCommentForm;
