// src/components/Signup.tsx
import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signupApi } from "../Services/AuthService";
import GoogleAuthPage from "../Pages/GoogleAuthPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle,FaExclamationCircle } from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    actualName: "",
    email: "",
    password: "",
    sentimentAnalysis: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- Validation ---
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Enter a valid email address",
      }));
    }
    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value)
          ? ""
          : "Password must be 8+ chars, include uppercase, lowercase, number & special character",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateEmail(form.email) || !validatePassword(form.password)) {
     toast.error("Please fix validation error first!",{ 
       icon: <FaExclamationCircle />,
       closeButton: false,
       position: "top-center",
       autoClose: 1000,
       hideProgressBar: true,
       closeOnClick: false,
       pauseOnHover: true,
       draggable: false,
       progress: undefined,
       style: { fontWeight: "bold",
                color:"red"
              },
     });
      setLoading(false);
      return;
    }

    try {
      await signupApi(form);
      toast.success("Signup successful! 🎉",{ 
        icon: <FaCheckCircle />,
        closeButton: false,
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        style: { fontWeight: "bold",
                 color:"green"
               },
      });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
        toast.error("Signup Failed : user may already exists! "+err.message,{ 
       icon: <FaExclamationCircle />,
       closeButton: false,
       position: "top-center",
       autoClose: 1000,
       hideProgressBar: true,
       closeOnClick: false,
       pauseOnHover: true,
       draggable: false,
       progress: undefined,
       style: { fontWeight: "bold",
                color:"red"
              },
     });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        color="#333"
        sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
      >
        Sign Up
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          label="Fullname"
          name="actualName"
          value={form.actualName}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="User Id"
          name="userName"
          value={form.userName}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          error={!!errors.password}
          helperText={errors.password}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            mt: 3,
            bgcolor: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#115293" },
          }}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>

        <GoogleAuthPage />

        <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
          Already have an account?{" "}
          <Link
            component="button"
            underline="hover"
            onClick={() => navigate("/login")}
            sx={{ fontWeight: "bold", color: "#24b8ddff" }}
          >
            Login
          </Link>
        </Typography>
      </form>

      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
}

export default Signup;
