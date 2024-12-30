// import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react"; // Import useState from React
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  
  const [email, setEmail] = useState("user@gmail.com"); // Default email
  const [password, setPassword] = useState("password"); // Default password
  const [loading, setLoading] = useState(false); // Loading state
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" }); // Snackbar state

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSnackbar({ open: true, message: data.message || "Login successful!", severity: "success" });

        // Save user details to localStorage (optional)
        localStorage.setItem("user", JSON.stringify(data.user));

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500); // Redirect after 1.5 seconds
      } else {
        const errorData = await response.json();
        setSnackbar({ open: true, message: errorData.message || "Invalid credentials.", severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Network error. Please try again.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="email"
              id="email"
              name="email"
              placeholder="user@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          <p>
            Don&apos;t have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginPage;
