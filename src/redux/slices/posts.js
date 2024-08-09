import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { byField } from '../../utils/sortByField';
import { byData } from '../../utils/sortByData';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchDeletePost = createAsyncThunk('/posts/fetchDeletePost', async(id)=>{
  axios.delete(`/posts/${id}`)
})

export const fetchPostByTag = createAsyncThunk('/posts/fetchPostByTag', async(tagName)=>{
  const {data} = await axios.get(`/tags/${tagName}`);
  return data;
})



const initialState = {
  posts: {
    items: [],
    sortType:0,
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    sortPosts: (state, action) =>{
      switch (action.payload) {
        case 'popular':
          state.posts.items.sort(byField('viewsCount'));
          state.posts.sortType=1;
          break;
          case 'new':
            state.posts.items.sort(byData())
          state.posts.sortType=0;
            break;
        default:
          break;
      }
      
    },
  },
  extraReducers: {
    // Отримання статей
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
      state.posts.items.sort(byData())
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    // Отримання тегів
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    //Видалення статі 
    [fetchDeletePost.pending]: (state, action)=>{
      state.posts.items = state.posts.items.filter(obj=>obj._id !== action.meta.arg);
    },
    //Отримання статетй за тегом
    [fetchPostByTag.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPostByTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
      state.posts.items.sort(byData())
    },
    [fetchPostByTag.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
  },
});

export const postReducer = postsSlice.reducer;

export const {sortPosts} = postsSlice.actions;
