import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("logging in with", username, password);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameOnChange={({ target: { value } }) => setUsername(value)}
          handlePasswordOnChange={({ target: { value } }) => setPassword(value)}
        />
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
