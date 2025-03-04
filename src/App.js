// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import Category from './components/Category';

const HealthCheck = () => {
  return (
      <div>
          {JSON.stringify({ status: 'OK' })}
      </div>
  );
};

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/new" element={<PostForm />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/postform/:id?" element={<PostForm />} />
          <Route path="/healthcheck" component={HealthCheck} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
