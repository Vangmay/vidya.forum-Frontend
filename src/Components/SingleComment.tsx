import React from "react";
import { Box, Text, Avatar } from "@chakra-ui/react";

const SingleComment = ({ comment }: { comment: any }) => {
  const { content, user } = comment;

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      {/* <Avatar name={user.userName} size="sm" marginRight={2} /> */}
      <Box>
        <Text fontWeight="bold">{user.userName}</Text>
        <Text>{content}</Text>
      </Box>
    </Box>
  );
};

export default SingleComment;
