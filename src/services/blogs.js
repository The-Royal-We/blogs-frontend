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

// eslint-disable-next-line import/no-anonymous-default-export
export { getAllBlogs, createBlog, setApiToken };
