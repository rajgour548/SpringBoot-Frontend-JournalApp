import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Alert,
  Link,

} from "@mui/material";
import { loginUser, sendVerificationCode, verifyEmail } from "../Services/AuthService";
import { useNavigate } from "react-router-dom";
import GoogleAuthPage from "./GoogleAuthPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle,FaExclamationCircle } from "react-icons/fa";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState<"login" | "email" | "verify">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- Normal Login ---
  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await loginUser(userName, password);
      localStorage.setItem("jwt", res.jwt);
       toast.success("Login successful! 🎉",{ 
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
      setTimeout(()=>navigate("/home"),1500);
    } catch (err: any) {
          toast.error("Login Failed! : "+err.message,{ 
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

  

  // --- Forgot Password Flow ---
  const handleForgotPassword = () => {
    setEmail(userName || "");
    setStep("email");
  };

  const handleSendCode = async () => {
    setError("");
    setLoading(true);
    try {
      await sendVerificationCode(email);
      toast.success("Verification code sent to your email!",{ 
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
      setStep("verify");
    } catch (err: any) {
          toast.error("Failed to send code : "+err.message,{ 
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

  const handleVerify = async () => {
    setError("");
    setLoading(true);
    try {
      const jwt = await verifyEmail(email, verificationCode);
      localStorage.setItem("jwt", jwt);
         toast.success("Verified",{ 
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
      navigate("/home");
    } catch (err: any) {
         toast.error("Verification Failed : "+err.message,{ 
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

  const handleCancel = () => {
    setStep("login");
    setVerificationCode("");
    setEmail("");
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
        Login
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {/* --- LOGIN --- */}
      {step === "login" && (
        <>
          <TextField
            label="User Id"
            variant="outlined"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            disabled={loading}
            sx={{
              mt: 3,
              bgcolor: "#1976d2",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#115293" },
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <GoogleAuthPage />

          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
            <Link
              component="button"
              underline="hover"
              onClick={handleForgotPassword}
              sx={{ fontWeight: "bold", color: "#24b8ddff" }}
            >
              Forgot User Id or Password?
            </Link>
          </Typography>

          <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
            Don't have an account?{" "}
            <Link
              component="button"
              underline="hover"
              onClick={() => navigate("/")}
              sx={{ fontWeight: "bold", color: "#24b8ddff" }}
            >
              Sign Up
            </Link>
          </Typography>
        </>
      )}

      {/* --- EMAIL --- */}
      {step === "email" && (
        <>
          <TextField
            label="Enter your email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleSendCode}
            disabled={loading || !email}
            sx={{
              mt: 3,
              bgcolor: "#1976d2",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#115293" },
            }}
          >
            {loading ? "Sending..." : "Send Verification Code"}
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={handleCancel}
            disabled={loading}
            sx={{ mt: 1 }}
          >
            Cancel
          </Button>
        </>
      )}

      {/* --- VERIFY --- */}
      {step === "verify" && (
        <>
          <TextField
            label="Verification Code"
            variant="outlined"
            fullWidth
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleVerify}
            disabled={loading || !verificationCode}
            sx={{
              mt: 3,
              bgcolor: "#1976d2",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#115293" },
            }}
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleSendCode}
            disabled={loading}
            sx={{ mt: 1 }}
          >
            Resend Code
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={handleCancel}
            disabled={loading}
            sx={{ mt: 1 }}
          >
            Cancel
          </Button>
        </>
      )}
     
      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
};

export default Login;
