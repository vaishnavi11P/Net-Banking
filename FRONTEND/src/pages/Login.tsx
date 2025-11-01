import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      nav("/dashboard");
    } catch (e: any) {
      setError(e?.response?.data?.error || "Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={submit} className="card w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">User Login</h2>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div>
          <label className="label">Username</label>
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-full" type="submit">
          Login
        </button>
        <div className="text-center text-sm">
          New user?{" "}
          <Link to="/register" className="underline">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
