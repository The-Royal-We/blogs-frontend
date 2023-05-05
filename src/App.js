import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Toggleable from "./components/Toggleable";
import {
  getAllBlogs,
  createBlog,
  setApiToken,
  updateBlog,
} from "./services/blogs";
import login from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogRecentlyAdded, setBlogRecentlyAdded] = useState(null);
  const [user, setUser] = useState("");
  const blogRef = useRef();
  const loginRef = useRef();

  const BlogAddedNotification = ({ message }) => {
    if (message === null) {
      return null;
    }

    const style = {
      color: "green",
      background: "lightgrey",
      fontSize: "20px",
      borderStyle: "solid",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
    };
    return <div style={style}>{message}</div>;
  };

  const ErrorMessageNotification = ({ message }) => {
    if (message === null) {
      return null;
    }

    const style = {
      color: "red",
      background: "lightgrey",
      fontSize: "20px",
      borderStyle: "solid",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
    };

    return <div style={style}>{message}</div>;
  };

  useEffect(() => {
    const storedUser = window.localStorage.getItem("loggedBlogAppUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      setApiToken(user.token);
    }
  }, []);

  useEffect(() => {
    getAllBlogs().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (e) {
      setErrorMessage(e.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleBlogFormSubmit = async (blog) => {
    try {
      const newlyCreatedBlog = await createBlog(blog);
      if (newlyCreatedBlog) {
        setBlogs(blogs.concat(newlyCreatedBlog));
        const { title, author } = newlyCreatedBlog;
        setBlogRecentlyAdded(`a new blog ${title} by ${author} has been added`);
        setTimeout(() => {
          setBlogRecentlyAdded(null);
        }, 5000);
      }
    } catch (err) {
      setErrorMessage(err.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    blogRef.current.toggleVisibility();
  };

  const loginForm = () => (
    <Toggleable buttonLabel={"Click to Login"} ref={loginRef}>
      <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
        handleUsernameOnChange={({ target: { value } }) => setUsername(value)}
        handlePasswordOnChange={({ target: { value } }) => setPassword(value)}
      />
      <button onClick={() => loginRef.current.toggleVisibility()}>
        cancel
      </button>
    </Toggleable>
  );

  const createBlogForm = () => (
    <Toggleable buttonLabel={"Click to create a post"} ref={blogRef}>
      <CreateBlogForm createBlog={handleBlogFormSubmit} />
      <button onClick={() => blogRef.current.toggleVisibility()}>cancel</button>
    </Toggleable>
  );

  const handleLikeButton = async (blog) => {
    const blogToBeUpdated = {
      ...blog,
      likes: blog.likes + 1,
    };
    try {
      const newBlog = await updateBlog(blog.id, blogToBeUpdated);
      setBlogs(blogs.map((b) => (b.id !== newBlog.id ? b : newBlog)));
    } catch (e) {
      setErrorMessage(e.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage && <ErrorMessageNotification message={errorMessage} />}
      {blogRecentlyAdded && (
        <BlogAddedNotification message={blogRecentlyAdded} />
      )}
      {!user && <div>{loginForm()}</div>}
      {user && (
        <div>
          <div>
            {user.name} has logged in{" "}
            <button onClick={handleLogout}>Logout</button>
          </div>
          {createBlogForm()}
          <div>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLikeButton={handleLikeButton}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
