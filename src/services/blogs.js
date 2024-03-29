import axios from "axios";
const baseUrl = "/api/blogs";

let apiToken;

const setApiToken = (token) => {
  apiToken = `Bearer ${token}`;
};

const getAllBlogs = async () => {
  const request = await axios.get(baseUrl);
  const { data } = request;
  return data;
};

const createBlog = async (blogData) => {
  const config = {
    headers: { Authorization: apiToken },
  };
  const request = await axios.post(baseUrl, blogData, config);
  const { data } = request;
  return data;
};

const updateBlog = async (id, blogData) => {
  const config = {
    headers: { Authorization: apiToken },
  };
  const request = await axios.put(`${baseUrl}/${id}`, blogData, config);
  const { data } = request;
  return data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: apiToken },
  };
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  const { data } = request;
  return data;
};

export { getAllBlogs, createBlog, setApiToken, updateBlog, deleteBlog };
