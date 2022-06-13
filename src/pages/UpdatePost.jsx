import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from '../components/Form';
import usePost from '../hooks/usePost';

function UpdateItem() {
  const params = useParams();

  const { getPost } = usePost();

  useEffect(() => {
    getPost(params.id);
  }, []);

  return (
    <div>
      <Form />
    </div>
  );
}

export default UpdateItem;
