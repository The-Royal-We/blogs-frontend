import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import login from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      console.log("Will implement error handlin here", e);
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
