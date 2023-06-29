import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

export const AddComment = ({onAddComment}) => {
  const { data } = useSelector(state => state.auth);

  const [text, setText] = React.useState('')

  const onComment = () => {
    onAddComment(text)
    setText('')
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={data?.avatarUrl}
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={onComment} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
