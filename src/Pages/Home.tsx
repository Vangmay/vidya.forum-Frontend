import React, { useEffect, useState } from "react";
import User from "../App";
import SingleComment from "../Components/SingleComment";
import SinglePost from "../Components/SinglePost";
import { VStack, FormControl, FormLabel, Select } from "@chakra-ui/react";

interface HomeProps {
  user: User;
}
const SamplePost = {
  id: 1,
  body: "I would like to announce that my stuff is being released on 25th Jan 2024",
  title: "Epic announcement",
  tag: "Web Development",
  userId: 1,
  user: {
    id: 1,
    userName: "test",
    email: "test@gmail.com",
    isAdmin: false,
  },
  comments: [
    {
      id: 1,
      content: "Good job",
      postId: 1,
      post: {
        id: 0,
        body: "",
        title: "",
        tag: "",
        userId: 0,
        user: {
          id: 0,
          userName: "",
          email: "",
          isAdmin: false,
        },
        comments: null,
        likes: 0,
        IsEdited: false,
      },
      userId: 1,
      user: {
        id: 1,
        userName: "test",
        email: "test@gmail.com",
        isAdmin: false,
      },
    },
    {
      id: 2,
      content: "Very Well sire",
      postId: 1,
      post: {
        id: 0,
        body: "",
        title: "",
        tag: "",
        userId: 0,
        user: {
          id: 0,
          userName: "",
          email: "",
          isAdmin: false,
        },
        comments: null,
        likes: 0,
        IsEdited: false,
      },
      userId: 1,
      user: {
        id: 1,
        userName: "test",
        email: "test@gmail.com",
        isAdmin: false,
      },
    },
  ],
  likes: 0,
  IsEdited: false,
};

const Home = ({ user }: HomeProps) => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(filter)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .then((error) => console.error("Error fetching posts: ", error));
  }, [filter]);

  return (
    <div>
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
      <SinglePost post={SamplePost} />
      <VStack spacing={4}>
        {posts.map((post) => (
          <SinglePost post={post} />
        ))}
      </VStack>
    </div>
  );
};

export default Home;
