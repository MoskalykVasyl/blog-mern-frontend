import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';


import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';

import {fetchPosts, fetchTags, sortPosts} from '../redux/slices/posts'

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags} = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.data);

  console.log('userData', userData);


  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = posts.status === 'loading';

  useEffect(()=>{
    dispatch(fetchPosts())
    dispatch(fetchTags())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ])

  const onSortPosts = (typeSort)=>{
    dispatch(sortPosts(typeSort));
  }
  console.log(tags);
  return (
    <>
      <Tabs style={{ marginBottom: 15 }}  value={posts.sortType} aria-label="basic tabs example">
        <Tab onClick={()=>onSortPosts('new')} label="Нові" />
        <Tab onClick={()=>onSortPosts('popular')} label="Популярні" />
      </Tabs>
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
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
         
        </Grid>
      </Grid>
    </>
  );
};
