import React, { useEffect, useState } from "react";
import User from "../App";
import SingleComment from "../Components/SingleComment";
import SinglePost from "../Components/SinglePost";
import {
  VStack,
  FormControl,
  FormLabel,
  Select,
  HStack,
  Link,
} from "@chakra-ui/react";
import PostForm from "../Components/PostForm";
import EditPostForm from "../Components/EditPostForm";
import PostCard from "../Components/PostCard";

interface HomeProps {
  user: User;
}

const Home = ({ user }: HomeProps) => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("http://localhost:8000/posts");

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
      <h4>{JSON.stringify(user)}</h4>
      {/* <h4>Create post</h4>
      <PostForm /> */}
      <FormControl>
        <FormLabel>Filter</FormLabel>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="http://localhost:8000/posts">None</option>
          <option value="http://localhost:8000/posts/popular">
            Most Popular
          </option>
          <option value="http://localhost:8000/posts/Science">Science</option>
          <option value="http://localhost:8000/posts/Mathematics">
            Mathematics
          </option>
          <option value="http://localhost:8000/posts/ComputerScience">
            Computer Science
          </option>
        </Select>
      </FormControl>

      <PostForm />

      <VStack spacing={4}>
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
