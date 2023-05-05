import { useState } from "react";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const { title, author, url, likes, user } = blog;
  const [showDetail, setShowDetail] = useState(false);
  const handleViewToggle = () => setShowDetail(!showDetail);

  const showWhenToggledStyle = { display: showDetail ? "" : "none" };
  const buttonText = showDetail ? "hide" : "view";
  return (
    <div>
      <div id={"blogSummary"} style={blogStyle}>
        {title} {author}
        <button onClick={handleViewToggle}>{buttonText}</button>
        <div style={showWhenToggledStyle}>
          <p>
            <a href={url}>{url}</a>
          </p>
          <p>
            Likes: {likes}
            <button>Like</button>
          </p>
          <p>{user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
