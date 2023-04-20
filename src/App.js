import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import { getAllBlogs, createBlog, setApiToken } from "./services/blogs";
import login from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (e) {
      console.log("Will implement error handlin here", e);
    }
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

  const handleOnBlogFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const newlyCreatedBlog = await createBlog({
        author: blogAuthor,
        title: blogTitle,
        url: blogUrl,
      });
      if (newlyCreatedBlog) {
        setBlogs(blogs.concat(newlyCreatedBlog));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      {!user && (
        <div>
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleUsernameOnChange={({ target: { value } }) =>
              setUsername(value)
            }
            handlePasswordOnChange={({ target: { value } }) =>
              setPassword(value)
            }
          />
        </div>
      )}
      {user && (
        <div>
          <div>
            {user.name} has logged in{" "}
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div>
            <h2>create new blogs!</h2>
            <form onSubmit={handleOnBlogFormSubmit}>
              <div>
                title:{" "}
                <input
                  type="text"
                  value={blogTitle}
                  onChange={({ target: { value } }) => setBlogTitle(value)}
                />
              </div>
              <div>
                author:{" "}
                <input
                  type="text"
                  value={blogAuthor}
                  onChange={({ target: { value } }) => setBlogAuthor(value)}
                />
              </div>
              <div>
                url:{" "}
                <input
                  type="text"
                  value={blogUrl}
                  onChange={({ target: { value } }) => setBlogUrl(value)}
                />
              </div>
              <button type="submit">create</button>
            </form>
          </div>
          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
