import React, { useState } from "react";

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const handleOnBlogFormSubmit = async (e) => {
    e.preventDefault();
    await createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <h2>create new blogs!</h2>
      <form onSubmit={handleOnBlogFormSubmit}>
        <div>
          title:{" "}
          <input
            type="text"
            value={title}
            onChange={({ target: { value } }) => setTitle(value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            value={author}
            onChange={({ target: { value } }) => setAuthor(value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            value={url}
            onChange={({ target: { value } }) => setUrl(value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
