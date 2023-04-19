const LoginForm = ({
  handleLogin,
  username,
  handleUsernameOnChange,
  password,
  handlePasswordOnChange,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameOnChange}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordOnChange}
      />
    </div>
    <div>
      <button type="submit">login</button>
    </div>
  </form>
);

export default LoginForm;
