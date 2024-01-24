import React, { useEffect, useState } from "react";
import {
  HStack,
  Link,
  Center,
  VStack,
  Box,
  Flex,
  Avatar,
  Text,
  Heading,
  Image,
  Stack,
  Button,
} from "@chakra-ui/react";
import PostCard from "./PostCard";
import EditUserProfileForm from "./EditUserProfileForm";
import { useParams } from "react-router-dom";
import { HOST_URL } from "../App";

const UserCard = ({
  user,
  currentUser,
  likes,
}: {
  user: any;
  currentUser: any;
  likes: any;
}) => {
  const [editModeOn, setEditModeOn] = useState(false);
  console.log(user);
  return (
    <Center py={6}>
      <Box
        maxW={"270px"}
        w={"full"}
        bg={"white"}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit="cover"
          alt="#"
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {user.userName}
            </Heading>
            <Text color={"gray.500"}>{user.bio}</Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{likes}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Total Number of likes
              </Text>
            </Stack>
          </Stack>
          {user.id == currentUser.id ? (
            <Button
              w={"full"}
              mt={8}
              bg={"gray.900"}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              onClick={() => setEditModeOn(!editModeOn)}
            >
              {editModeOn ? "Close" : "Edit Profile"}
            </Button>
          ) : (
            <></>
          )}
          {editModeOn ? <EditUserProfileForm currentUser={user} /> : ""}
        </Box>
      </Box>
    </Center>
  );
};

function UserProfile({ CurrentUser }: { CurrentUser: any }) {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(0);
  const [user, setUser] = useState([]);
  console.log("userid");
  console.log(userId);
  useEffect(() => {
    fetch(`${HOST_URL}/posts/user/${userId}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log("data");
        setPosts(data);
        console.log(data);
      })
      .then((error) => console.error("Error fetching posts: ", error));

    if (posts.length != 0) {
      fetch(`${HOST_URL}/user/likes/${userId}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log("data");
          setLikes(data.likes_sum);
          console.log(data.likes_sum);
        })
        .then((error) => console.error("Error fetching posts: ", error));
    }

    fetch(`${HOST_URL}/auth/user/${userId}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setUser(data);
        console.log("user");
        console.log(user);
      })
      .then((err) => console.error("Error getting user", err));
  }, []);
  return (
    <>
      <UserCard user={user} currentUser={CurrentUser} likes={likes} />
      <Center>
        <VStack spacing={4}>
          <br />
          <Heading as="h3">Posts by you</Heading>

          {posts.map((post: any) => (
            <HStack key={post.id}>
              <Link
                href={`/post/${post.id}`}
                _hover={{
                  textDecoration: "none", // Remove the default underline
                  borderBottom: "2px solid #00f", // Add your custom underline style
                }}
              >
                <PostCard post={post} currentUser={user} />
              </Link>
            </HStack>
          ))}
        </VStack>
      </Center>
    </>
  );
}

export default UserProfile;
