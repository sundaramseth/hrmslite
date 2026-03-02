import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
    const response = await axios.post(
      "https://hrmslite-ubcb.onrender.com/api/token/",
      { username, password }
    );

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

navigate("/employee");
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
        console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;