// // src/components/SignUpPage.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function SignUpPage() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     // For this demo, we just alert & navigate to login
//     alert("Sign Up successful! Now log in with user@gmail.com / password");
//     navigate("/login");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
//       <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
//         <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Username */}
//           <div>
//             <label className="block mb-1 font-semibold" htmlFor="username">
//               Username
//             </label>
//             <input
//               className="w-full p-2 border border-gray-300 rounded"
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block mb-1 font-semibold" htmlFor="email">
//               Email
//             </label>
//             <input
//               className="w-full p-2 border border-gray-300 rounded"
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block mb-1 font-semibold" htmlFor="password">
//               Password
//             </label>
//             <input
//               className="w-full p-2 border border-gray-300 rounded"
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block mb-1 font-semibold" htmlFor="confirmPassword">
//               Confirm Password
//             </label>
//             <input
//               className="w-full p-2 border border-gray-300 rounded"
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignUpPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false); // For loading state
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" }); // Snackbar state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setSnackbar({ open: true, message: "Passwords do not match!", severity: "error" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: formData.username,
          user_email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSnackbar({ open: true, message: data.message || "Sign Up successful!", severity: "success" });
        setTimeout(() => navigate("/login"), 1500); // Redirect after 1.5 seconds
      } else {
        const errorData = await response.json();
        setSnackbar({ open: true, message: errorData.message || "Something went wrong.", severity: "error" });
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
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block mb-1 font-semibold" htmlFor="username">
              Username
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 font-semibold" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
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

export default SignUpPage;
