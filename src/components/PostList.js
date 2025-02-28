import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { PostAPI } from '../api'; // your axios instance

function PostRow({ post, onDelete }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Truncate description if longer than 50 characters
  const truncatedDescription =
    post.description.length > 50
      ? `${post.description.slice(0, 50)}...`
      : post.description;

  const handleEdit = () => {
    // Navigate to PostForm route with the post id, e.g. /postform/1
    navigate(`/postform/${post.id}`);
  };

  const handleDelete = async () => {
    try {
      await PostAPI.delete(post.id);
      // Optionally, update the parent state to remove the post
      // For example, call onDelete(post.id) if passed as a prop.
      if (onDelete) onDelete(post.id);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {post.title}
        </TableCell>
        <TableCell>{post.date}</TableCell>
        <TableCell>{truncatedDescription}</TableCell>
        <TableCell>{post.category.name}</TableCell>
        <TableCell>{post.duration}</TableCell>
        <TableCell>
          <Button variant="outlined" size="small" sx={{ mr: 1 }} onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="outlined" color="error" size="small" onClick={handleDelete}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Full Description
              </Typography>
              <Typography variant="body2" gutterBottom>
                {post.description}
              </Typography>
              {post.image_url && (
                <Box
                  component="img"
                  sx={{
                    mt: 2,
                    maxWidth: '100%',
                    borderRadius: 1,
                  }}
                  alt={post.title}
                  src={post.image_url}
                />
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

PostRow.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image_url: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func, // optional callback from parent to update state
};

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await PostAPI.getAll();
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    }
    fetchPosts();
  }, []);

  // Remove the deleted post from state
  const handleDelete = (deletedPostId) => {
    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== deletedPostId));
  };

  if (!posts.length) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Loading posts...
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible post table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <PostRow key={post.id} post={post} onDelete={handleDelete} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}