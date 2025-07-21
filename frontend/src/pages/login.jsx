import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userIcon from "../assets/images/user.png"; // default icon

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.status === 200) {
        // Save user data locally
        const userData = { ...data.user, image: userIcon };
        localStorage.setItem("user", JSON.stringify(userData));
        window.location.href = "/";
        alert("Login successful!");
        navigate("/");
      } else {
        console.log(data.error)
        alert(data.message);
      }
    } catch (err) {
      alert("Error logging in. Please try again.");
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-200 p-30">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow-md rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-pink-800 text-white p-2 rounded hover:bg-pink-700 cursor-pointer">
          Login
        </button>
        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">Register now</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
