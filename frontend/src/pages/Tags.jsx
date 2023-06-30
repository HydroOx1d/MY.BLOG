import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchPostsByTag } from '../store/slices/postSlices'
import { Post } from '../components'

export const Tags = () => {
  const {tagId} = useParams()
  const { items } = useSelector(state => state.posts.posts)
  const { data } = useSelector((state) => state.auth);

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchPostsByTag(tagId))
  }, [])

  return (
    <div>
      {items.map(post => {
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
      })}
    </div>
  )
}
