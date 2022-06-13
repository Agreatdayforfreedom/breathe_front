import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [alert, setAlert] = useState({});
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/post`);
      setPosts(data);
    };
    getPosts();
  }, []);

  const getPost = async (id) => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/post/${id}`
      );
      setPost(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const submitPost = async (post) => {
    if (post.id) {
      await updatePost(post);
    } else {
      await createPost(post);
    }
  };

  const createPost = async (post) => {
    const { title, subject } = post;
    try {
      if ([title, subject].includes('')) {
        showAlert({
          message: 'all fields are required',
          error: true,
        });
        return;
      }

      const token = localStorage.getItem('tkn');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/post`,
        { title, subject },
        config
      );
      setPosts([...posts, data]);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (post) => {
    const { id, title, subject } = post;
    console.log(post);

    try {
      const token = localStorage.getItem('tkn');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/post/${id}`,
        { title, subject },
        config
      );
      // const postArrUpdate = posts.map((post) =>
      //   post._id === data._id ? data : post
      // );
      // setPosts(postArrUpdate);
      // console.log(postArrUpdate);

      navigate(`/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const token = localStorage.getItem('tkn');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/post/${postId}`,
        config
      );
      const postFilter = posts.filter((post) => post._id !== postId);
      setPosts(postFilter);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  /*! message */

  const newMessage = async (message, postId) => {
    try {
      const token = localStorage.getItem('tkn');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = axios.post(
        `${import.meta.env.VITE_API_URL}/message`,
        { message, post: postId },
        config
      );
      //TODO: add message without reload
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        post,
        getPost,
        submitPost,
        deletePost,
        alert,
        showAlert,
        loading,
        newMessage,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
