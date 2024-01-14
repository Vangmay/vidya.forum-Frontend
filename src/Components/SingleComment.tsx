import React from "react";
import { Box, Text, Avatar, Button } from "@chakra-ui/react";
import EditCommentForm from "./EditCommentForm";

function DeleteComment({
  comment,
  currentUser,
}: {
  comment: any;
  currentUser: any;
}) {
  const { user } = comment;
  console.log(user);
  async function handleDelete(e: any) {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8000/comment/${comment.id}`,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      }
    );

    if (response.ok) {
      console.log("Comment deleted");
      window.location.reload();
    } else {
      console.error("Failed to edit comment");
    }
  }

  return <Button onClick={handleDelete}>Delete</Button>;
}

const SingleComment = ({
  comment,
  currentUser,
}: {
  comment: any;
  currentUser: any;
}) => {
  const { content, user } = comment;

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      {/* <Avatar name={user.userName} size="sm" marginRight={2} /> */}
      <Box>
        <Text fontWeight="bold">{user.userName}</Text>
        <Text>{content}</Text>
      </Box>
      <EditCommentForm comment={comment} />
      <DeleteComment comment={comment} currentUser={currentUser} />
    </Box>
  );
};

export default SingleComment;
