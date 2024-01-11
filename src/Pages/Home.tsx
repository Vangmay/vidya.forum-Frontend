import React from "react";
import User from "../App";

interface HomeProps {
  user: User;
}

const Home = ({ user }: HomeProps) => {
  console.log("Home");
  console.log(user);
  return <div>{JSON.stringify(user)}</div>;
};

export default Home;
