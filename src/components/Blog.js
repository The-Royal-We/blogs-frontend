import { useState } from "react";

const BlogDetail = ({ blog, style, handleToggle }) => {
  const { title, author, url, likes } = blog;
  return (
    <div style={style}>
      <p>
        {title} <button onClick={handleToggle}>hide</button>
      </p>
      <p>{url}</p>
      <p>Likes: {likes}</p>
      <p>{author}</p>
    </div>
  );
};

const BlogSummary = ({ blog, style }) => (
  <div style={style}>
    {blog.title} {blog.author}
  </div>
);

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [showDetail, setShowDetail] = useState(false);
  const handleToggle = () => setShowDetail(!showDetail);
  // return <BlogDetail style={blogStyle} blog={blog} />;
  return <BlogSummary blog={blog} style={blogStyle} />;
};

export default Blog;
