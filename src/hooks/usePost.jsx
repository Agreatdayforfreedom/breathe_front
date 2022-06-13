import { useContext } from 'react';
import { PostContext } from '../context/PostProvider';

const usePost = () => useContext(PostContext);

export default usePost;
