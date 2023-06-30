import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

import { useDispatch, useSelector} from 'react-redux'
import { fetchComments, fetchPosts, fetchTags } from '../store/slices/postSlices';
// import { addComment } from '../api/index'

export const Home = () => {
  const {posts, tags, comments} = useSelector(state => state.posts)
  const {data} = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const postsIsLoading = posts.status === 'loading'
  const tagsIsLoading = tags.status === 'loading'
  const commentsIsLoading = comments.status === 'loading'

  React.useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())  
    dispatch(fetchComments())
  }, [])

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {!postsIsLoading
            ? posts.items.map((post) => {
                return (
                  <Post
                    key={post._id}
                    _id={post._id}
                    title={post.title}
                    imageUrl={post.imageUrl}
                    user={{
                      avatarUrl: post.user.avatarUrl,
                      username: post.user.username,
                    }}
                    createdAt={post.createdAt}
                    viewsCount={post.viewsCount}
                    commentsCount={post.comments.length}
                    tags={post.tags}
                    isEditable={data?._id === post.user._id}
                  />
                );
              })
            : [...Array(5)].map((_, i) => (
                <Post key={i} isLoading={postsIsLoading} />
              ))}
          {posts.items.length <= 0 && (
            <div style={{ height: "400px", width: "100%" }}>
              <img
                src="/no-data.png"
                alt="empty content"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={tagsIsLoading} />
          <CommentsBlock items={comments.items} isLoading={commentsIsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
