import React, { useEffect, useState } from "react";
import User, { HOST_URL } from "../App";
import SingleComment from "../Components/SingleComment";
import SinglePost from "../Components/SinglePost";
import {
  VStack,
  FormControl,
  FormLabel,
  Select,
  HStack,
  Link,
  Box,
} from "@chakra-ui/react";
import PostForm from "../Components/PostForm";
import EditPostForm from "../Components/EditPostForm";
import PostCard from "../Components/PostCard";

interface HomeProps {
  user: User;
}

const Home = ({ user }: HomeProps) => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState(`${HOST_URL}/posts`);

  useEffect(() => {
    console.log(filter);
    fetch(filter, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        console.log("data");
        console.log(data);
      })
      .then((error) => console.error("Error fetching posts: ", error));
  }, [filter]);

  return (
    <div>
      {JSON.stringify(user)}
      <VStack spacing={4}>
        <br />
        <Box padding="12px">
          <PostForm user={user} />
        </Box>
        <Box w="md">
          <FormControl>
            <Select
              value={filter}
              onChange={(e) => setFilter(`${HOST_URL} / ${e.target.value}`)}
            >
              <option value="posts">Filter</option>
              <option value="posts/popular">Most Popular</option>
              <option value="posts/Science">Science</option>
              <option value="posts/Mathematics">Mathematics</option>
              <option value="posts/ComputerScience">Computer Science</option>
            </Select>
          </FormControl>
        </Box>

        {posts.map((post: any) => (
          <HStack>
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
    </div>
  );
};

export default Home;
