import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as registerRequest } from "../api/auth";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await registerRequest(email, password);
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="page-center">
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />

          <button type="submit">Create Account</button>
        </form>

        <p className="small-text">
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
