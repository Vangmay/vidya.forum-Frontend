import React, { useState } from "react";
import {
  Box,
  Text,
  Heading,
  Avatar,
  Button,
  HStack,
  Card,
  CardHeader,
  Flex,
  IconButton,
  CardBody,
  Image,
  CardFooter,
} from "@chakra-ui/react";
import BiLike from "react-icons";
interface PostCardProps {
  post: any;
  currentUser: any;
}

const PostCard = ({ post, currentUser }: PostCardProps) => {
  const { id, title, body, user, IsEdited, likes } = post;
  const signal = IsEdited ? "edited" : "";
  const [like, setLike] = useState(false);
  return (
    <Card maxW="md">
      <CardHeader>
        <Flex gap={4}>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Box>
              <Avatar name={user.userName} size="md" mb={2} />
              <Box>
                <Heading size="sm">{user.userName}</Heading>
                <Text>{user.Bio}</Text>
                <Heading size="md">{post.title}</Heading>
              </Box>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{post.body}</Text>
      </CardBody>
      <Image objectFit="cover" src={post.Image} />

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button flex="1" variant="ghost" onClick={() => setLike(false)}>
          Likes: {likes}
        </Button>
        <Button flex="1" variant="ghost">
          Comment
        </Button>
      </CardFooter>
    </Card>
  );
  //   return (
  //     <Box p={4} borderWidth="1px" borderRadius="md" width={"75vw"}>
  //       <HStack>
  //         <>
  //           <Box>
  //             <Heading as="h2" fontSize="xl" mb={2}>
  //               {title}
  //             </Heading>
  //             <Text mb={4}>{body}</Text>
  //           </Box>

  //           <Box>
  //             <Text fontSize="lg" fontWeight="bold" mb={2}>
  //               Posted by: {user.userName}
  //             </Text>
  //             <Avatar name={user.userName} size="md" mb={2} />
  //           </Box>
  //         </>
  //       </HStack>

  //       <Text>{signal}</Text>
  //     </Box>
  //   );
};

export default PostCard;
