import React, { useState } from "react";
import { Box, Text, Avatar, VStack, HStack, Button } from "@chakra-ui/react";
import SingleComment from "./SingleComment";
import CreateCommentForm from "./CreateCommentForm";
import { HOST_URL } from "../App";
// Implement CRUD for posts
export interface postProps {
  post: any; // ! Change later
  currentUser: any; // !change later
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}
const SinglePost = ({ post, currentUser, filter, setFilter }: postProps) => {
  const { id, title, body, tags, likes, user, comments, IsEdited } = post;
  console.log("Current User");
  console.log(currentUser);
  // Delete post logic
  async function handleDelete() {
    // Send a request to
    const response = await fetch(`${HOST_URL}/post/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      console.log("Post deleted successfully");

      // Refresh the page
      window.location.reload();
    } else {
      // Handle error cases if needed
      console.error("Failed to delete post");
    }
  }
  const [showLike, setShowLike] = useState(true);
  async function handleLike() {
    const response = await fetch(`${HOST_URL}/post/like/${id}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      console.log("Post liked succesfully");
      setShowLike(false);
    } else {
      console.error("failed to like post");
    }
  }
  async function handleUnlike() {
    const response = await fetch(`${HOST_URL}/post/unlike/${id}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      console.log("Post unliked succesfully");
      setShowLike(true);
    } else {
      console.error("failed to unlike post");
    }
  }

  let LikeButton = <Button onClick={() => handleLike()}>Like</Button>;
  let UnlikeButton = <Button onClick={() => handleUnlike()}>Unlike</Button>;
  let signal: string;
  IsEdited ? (signal = "edited") : (signal = "");
  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <HStack>
        <Button>Edit</Button>
        {user.id == currentUser.id ? (
          <Button onClick={handleDelete}>Delete</Button>
        ) : (
          <></>
        )}
      </HStack>
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {IsEdited}
      </Text>
      <Text>{signal}</Text>
      <Avatar name={user.userName} size="md" mb={2} />
      <Text mb={4}>{body}</Text>

      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Comments:
      </Text>
      <CreateCommentForm post={post} />
      <VStack spacing={2} align="stretch">
        {comments.map((comment: any) => (
          <SingleComment
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default SinglePost;
