import React from "react";

const CreateBlogForm = (props) => {
  return (
    <div>
      <h2>create new blogs!</h2>
      <form onSubmit={props.handleOnBlogFormSubmit}>
        <div>
          title:{" "}
          <input
            type="text"
            value={props.blogTitle}
            onChange={({ target: { value } }) => props.setBlogTitle(value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            value={props.blogAuthor}
            onChange={({ target: { value } }) => props.setBlogAuthor(value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            value={props.blogUrl}
            onChange={({ target: { value } }) => props.setBlogUrl(value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
