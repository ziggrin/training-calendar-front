// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/">Home</Link> |{' '}
      <Link to="/posts/new">New Post</Link> |{' '}
      <Link to="/categories">Category</Link>
    </nav>
  );
}

export default NavBar;
