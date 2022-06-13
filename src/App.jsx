import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authProvider';
import { PostProvider } from './context/PostProvider';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import Login from './pages/Login';
import Post from './pages/Post';
import Signup from './pages/Signup';
import UpdatePost from './pages/UpdatePost';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <Routes>
            <Route path="/" exact element={<AuthLayout />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/" exact element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/new-post" element={<CreatePost />} />
              <Route path="/update-post/:id" element={<UpdatePost />} />
              <Route path="/:id" element={<Post />} />
            </Route>
          </Routes>
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
