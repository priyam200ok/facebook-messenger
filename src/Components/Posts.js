import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Button,
  Input,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  Grid,
  Container,
} from "@material-ui/core";
import db from "../firebase";
import "./Posts.css";
import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";
import { blue } from "@material-ui/core/colors";
import FlipMove from "react-flip-move";

const Posts = () => {
  const [posts, setPosts] = useState();
  const [input, setInput] = useState();
  const [username, setuserName] = useState();
  useEffect(() => {
    setuserName(prompt("enter name"));
  }, []);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        )
      );
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    db.collection("posts").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      time: Date.now(),
    });
    setInput("");
  }
  return (
    <div>
      <Container justifyContent="center" className="app_container">
        {posts ? (
          posts.map(({ id, message }) => (
            <div
              className={
                username === message.username ? "message_user" : "message"
              }
            >
              <FlipMove>
                <div className="app_Typography">
                  <Typography color="primary">
                    {username !== message.username ? message.username : ""}
                  </Typography>

                  <Typography color="primary" justify-content="flex-end">
                    {`${new Date(message.time).getHours()}:${new Date(
                      message.time
                    ).getMinutes()}`}
                  </Typography>
                </div>
                <Card
                  key={id}
                  className={
                    username === message.username
                      ? "message_usercard"
                      : "message_guestcard"
                  }
                >
                  <Typography>{message.message}</Typography>
                </Card>
              </FlipMove>
            </div>
          ))
        ) : (
          <Card>No Messages..!!</Card>
        )}
      </Container>
      <div className="app_form_div">
        <form className="app_form">
          <FormControl className="app_formcontrol">
            <InputLabel>Enter Message</InputLabel>
            <Input
              className="app_input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <IconButton
              disabled={!input}
              onClick={(e) => handleSubmit(e)}
              type="submit"
              variant="contained"
              color="primary"
              className="app_button"
            >
              <SendIcon />
            </IconButton>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default Posts;
