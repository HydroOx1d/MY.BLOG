import React from "react";
import ReactMarkdown from 'react-markdown'

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { getFullPost, addComment} from "../api";

export const FullPost = () => {
  const { id } = useParams();
  
  const [data, setData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)

  
  React.useEffect(() => {
    getFullPost(id).then(data => {
      setData(data)
      setIsLoading(false)
    })
  }, [])
  
  if(isLoading) {
    return <Post isLoading={isLoading} />
  }
  
  const onAddComment = (text) => {
    addComment(id, text).then(comments => {
      setData({
        ...data,
        comments: comments.data
      })
    })
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={{
          avatarUrl: data.user.avatarUrl,
          fullName: data.user.username
        }}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text}/>
      </Post>
      <CommentsBlock
        items={data.comments}
        isLoading={false}
      >
        <Index onAddComment={onAddComment}/>
      </CommentsBlock>
    </>
  );
};
