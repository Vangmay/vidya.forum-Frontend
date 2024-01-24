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

interface EditProps {
  comment: any;
}
function EditCommentForm({ comment }: EditProps) {
  const [content, setContent] = useState(comment.Content);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const response = await fetch(`${HOST_URL}comment/${comment.id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content }),
    });

    if (response.ok) {
      console.log("Comment edited");
      window.location.reload();
    } else {
      console.error("Failed to edit comment");
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoFocus
        />
        <Button type="submit" colorScheme="teal">
          Edit Comment
        </Button>
      </form>
    </Box>
  );
}

export default EditCommentForm;
