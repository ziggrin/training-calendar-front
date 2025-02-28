import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryAPI, PostAPI } from '../api'; // Import your API helpers

function PostForm() {
  const { id } = useParams(); // If editing, id will be defined
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: '',
    date: '',
    description: '',
    duration: '',
    category_id: '',
    image_file: null
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories from your API
        const categoriesResponse = await CategoryAPI.getAll();
        setCategories(categoriesResponse.data);

        if (id) {
          // If editing, load the existing post
          const postResponse = await PostAPI.get(id);
          // Reset image_file to null so the user can upload a new one if desired
          setPostData({ ...postResponse.data, image_file: null });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPostData((prev) => ({ ...prev, image_file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData with properly nested keys for Rails parameters.
    const formData = new FormData();
    const fields = {
      title: postData.title,
      date: postData.date,
      description: postData.description,
      duration: postData.duration,
      category_id: postData.category_id,
      image_file: postData.image_file,
    };

    Object.entries(fields).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(`api_v1_post[${key}]`, value);
      }
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    };

    try {
      if (id) {
        // Update existing post
        await PostAPI.update(id, formData, config);
        // Navigate to the post's details page or index page as desired.
        navigate(`/`);
      } else {
        // Create new post
        await PostAPI.create(formData, config);
        // Navigate to the index page ("/") after creation.
        navigate('/');
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Post' : 'New Post'}</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Title*</label>
          <input
            type="text"
            name="title"
            value={postData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date*</label>
          <input
            type="date"
            name="date"
            value={postData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={postData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Duration (min)*</label>
          <input
            type="number"
            name="duration"
            value={postData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category*</label>
          <select
            name="category_id"
            value={postData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <a href="/categories/new" target="_blank" rel="noreferrer">
            New Category
          </a>
        </div>
        <div>
          <label>Upload Image</label>
          <input
            type="file"
            name="image_file"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <button type="submit">{id ? 'Update Post' : 'Create Post'}</button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
