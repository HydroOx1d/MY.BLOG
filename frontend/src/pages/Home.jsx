import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

import { useDispatch, useSelector} from 'react-redux'
import { fetchPosts, fetchTags } from '../store/slices/postSlices';

export const Home = () => {
  const {posts, tags} = useSelector(state => state.posts)
  const dispatch = useDispatch();

  const postsIsLoading = posts.status === 'loading'
  const tagsIsLoading = tags.status === 'loading'

  React.useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())  
  }, [])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {!postsIsLoading ? posts.items.map((post) => {
              return (
                <Post
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                  user={{
                    avatarUrl: post.user.avatarUrl,
                    fullName: post.user.username,
                  }}
                  createdAt={post.createdAt}
                  viewsCount={post.viewsCount}
                  commentsCount={3}
                  tags={post.tags}
                  isEditable
                />
              )
            }) : (
            [...Array(5)].map(() => (
              <Post isLoading={postsIsLoading}/>
            ))
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={tagsIsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
