// src/pages/GoogleAuthPage.tsx
import React, { useEffect } from "react";
import GoogleLoginButton from "../Components/GoogleLoginButton";
import {useNavigate} from "react-router-dom";
const GoogleAuthPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.token) {
        console.log("nothing received")
        localStorage.setItem("jwt", event.data.token);
        navigate("/home");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div>
      <GoogleLoginButton />
    </div>
  );
};

export default GoogleAuthPage;
