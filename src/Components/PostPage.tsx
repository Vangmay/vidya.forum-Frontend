import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Heading,
  Avatar,
  VStack,
  Button,
  IconButton,
  Flex,
  Center,
} from "@chakra-ui/react";
import {
  FaRegEdit,
  FaTrashAlt,
  FaThumbsUp,
  FaThumbsDown,
  FaRegThumbsUp,
  FaRegThumbsDown,
} from "react-icons/fa";
import SingleComment from "./SingleComment";
import CreateCommentForm from "./CreateCommentForm";
import EditPostForm from "./EditPostForm";

interface Post {
  id: string;
  title: string;
  body: string;
  tags: string[];
  likes: number;
  user: {
    id: string;
    userName: string;
  };
  comments: any[];
  IsEdited: boolean;
}
const emptyPost = {
  id: 0,
  title: "",
  body: "",
  tag: "",
  likes: 0,
  user: {
    id: 0,
    userName: "",
  },
  comments: [],
  IsEdited: false,
};

interface Props {
  currentUser: any; // !change later
}

function PostPage({ currentUser }: Props) {
  const { postId } = useParams();
  const [post, setPost] = useState(emptyPost);
  const [openEditForm, setOpenEditForm] = useState(false);
  const navigate = useNavigate();
  const [showLike, setShowLike] = useState(true);

  async function handleLike() {
    const response = await fetch(`http://localhost:8000/post/like/${post.id}`, {
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
    const response = await fetch(
      `http://localhost:8000/post/unlike/${post.id}`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      }
    );
    if (response.ok) {
      console.log("Post unliked succesfully");
      setShowLike(true);
    } else {
      console.error("failed to unlike post");
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/post/${postId}`, {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });
        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post details: ", error);
      }
    };

    fetchData();
  }, []);

  async function handleDelete() {
    // Send a request to
    const response = await fetch(`http://localhost:8000/post/${post.id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      console.log("Post deleted successfully");

      // Refresh the page
      navigate("/");
    } else {
      // Handle error cases if needed
      console.error("Failed to delete post");
    }
  }

  let signal: string;
  post.IsEdited ? (signal = "edited") : (signal = "");
  let Body = {};
  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Center>
        <Box
          margin={"2px"}
          borderRadius="10px"
          borderColor="black"
          borderWidth="2.5px"
          padding="20px"
        >
          <Flex align="center" justify="space-between" mb={4}>
            {openEditForm ? (
              <EditPostForm post={post} />
            ) : (
              <Box>
                <Text mb={2}>Posted by {post.user?.userName}</Text>
                <Heading as="h2" fontSize="2xl" mb={2}>
                  {post.title}
                </Heading>
                <Text
                  bg="gray.500"
                  width="fit-content"
                  padding="5px"
                  borderRadius="10px"
                >
                  {post.tag}
                </Text>
              </Box>
            )}
          </Flex>
          <Center>
            <Text mb={4}>{post.body}</Text>
          </Center>
          {/* {openEditForm ? <EditPostForm post={post} /> : <></>} */}

          <br></br>
          <br></br>
          <br></br>
          <Flex>
            {currentUser && currentUser.id === post.user?.id && (
              <Flex>
                <Button mr={2} aria-label="Comments" disabled>
                  {post.comments.length} Comments
                </Button>
                <Button mr={2} aria-label="Likes" disabled>
                  {post.likes} Likes
                </Button>
                {showLike ? (
                  <Button
                    leftIcon={<FaRegThumbsUp />}
                    colorScheme="blue"
                    mr={2}
                    aria-label="Like Post"
                    onClick={() => handleLike()}
                  >
                    Like
                  </Button>
                ) : (
                  <Button
                    leftIcon={<FaRegThumbsDown />}
                    colorScheme="blue"
                    mr={2}
                    aria-label="Edit Post"
                    onClick={() => handleUnlike()}
                  >
                    UnLike
                  </Button>
                )}
                <Button
                  leftIcon={<FaRegEdit />}
                  colorScheme="blue"
                  mr={2}
                  aria-label="Edit Post"
                  onClick={() => setOpenEditForm(!openEditForm)}
                >
                  {openEditForm ? "Close" : "Edit Post"}
                </Button>
                <Button
                  leftIcon={<FaTrashAlt />}
                  colorScheme="red"
                  mr={2}
                  aria-label="Edit Post"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Flex>
            )}
          </Flex>
        </Box>
      </Center>
      <Box margin={"20px"} border="solid 1px"></Box>
      <Center>
        <Text as="h2" fontSize="xl">
          Discussions
        </Text>
      </Center>
      <Center>
        <VStack spacing={4} padding={10} align="stretch">
          <CreateCommentForm post={post} />
          {post.comments.map((comment) => (
            <SingleComment comment={comment} currentUser={currentUser} />
          ))}
        </VStack>
      </Center>
    </Box>
  );
}

export default PostPage;
