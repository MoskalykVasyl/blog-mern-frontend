import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@mui/material/Grid';

import styles from "./TagsPost.module.scss";


import { Post } from '../../components/Post'; 
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { fetchPostByTag } from '../../redux/slices/posts';





export const TagPosts = () => {
  const {name} = useParams();
  const dispatch = useDispatch();
  const {posts} = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.data);

  console.log(posts)

  const isPostsLoading = posts.status === 'loading';

  useEffect(()=>{
    dispatch(fetchPostByTag(name))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



 

  
  
  return (
    <>
      <Typography classes={{ root: styles.title }} variant="h5">
        # {name}
      </Typography>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              key={obj._id}
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `${process.env.API_URL}${obj.imageUrl}` : ''} 
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={obj.commentsCount}
              tags={obj.tags}
              isEditable={obj.user._id === userData?._id}
            />
          )
          )}
        </Grid>
        
      </Grid>
    </>
  );
};