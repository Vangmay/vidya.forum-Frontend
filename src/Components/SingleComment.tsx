import React, { useState } from "react";
import { Box, Text, Avatar, Button } from "@chakra-ui/react";
import EditCommentForm from "./EditCommentForm";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { HOST_URL } from "../App";

function DeleteComment({
  comment,
  currentUser,
}: {
  comment: any;
  currentUser: any;
}) {
  const { user } = comment;
  console.log(user);
  async function handleDelete(e: any) {
    e.preventDefault();
    const response = await fetch(`${HOST_URL}comment/${comment.id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      console.log("Comment deleted");
      window.location.reload();
    } else {
      console.error("Failed to edit comment");
    }
  }

  return (
    <Button
      leftIcon={<FaTrashAlt />}
      colorScheme="red"
      mr={2}
      aria-label="Edit Post"
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
}

const SingleComment = ({
  comment,
  currentUser,
}: {
  comment: any;
  currentUser: any;
}) => {
  const [openEditForm, setOpenEditForm] = useState(false);
  const { content, user } = comment;

  return (
    <>
      <Box p={4} borderWidth="1px" borderRadius="md">
        {/* <Avatar name={user.userName} size="sm" marginRight={2} /> */}
        <Box>
          <Text fontWeight="bold">{user.userName}</Text>
          <br />
          <Text>{content}</Text>
        </Box>

        {user.Id == comment.user.Id ? (
          <>
            <br />
            <br />
            <DeleteComment comment={comment} currentUser={currentUser} />
            <Button
              leftIcon={<FaRegEdit />}
              colorScheme="blue"
              mr={2}
              aria-label="Edit Post"
              onClick={() => setOpenEditForm(!openEditForm)}
            >
              {openEditForm ? "Close" : "Edit Post"}
            </Button>
          </>
        ) : (
          <></>
        )}
        {openEditForm ? <EditCommentForm comment={comment} /> : <></>}
      </Box>
      <Box borderWidth={"1px"} padding={"30px"}></Box>
    </>
  );
};

export default SingleComment;
