import React from "react";
import { Box, Text, Avatar, VStack } from "@chakra-ui/react";
import SingleComment from "./SingleComment";

const SinglePost = ({ post }: { post: any }) => {
  const { title, body, tags, likes, user, comments, isEdited } = post;

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {title}
      </Text>
      <Avatar name={user.userName} size="md" mb={2} />
      <Text mb={4}>{body}</Text>

      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Comments:
      </Text>
      <VStack spacing={2} align="stretch">
        {comments.map((comment: any) => (
          <SingleComment key={comment.id} comment={comment} />
        ))}
      </VStack>
    </Box>
  );
};

export default SinglePost;
