// src/services/authService.ts
const backendUrl = import.meta.env.VITE_BACKEND_URL;
//signup

export interface SignupRequest {
  actualName:string,
  userName: string;
  email: string;
  password: string;
  sentimentAnalysis: boolean;
}

export async function signupApi(data: SignupRequest) {
  const response = await fetch(`${backendUrl}/public/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  // If no content is returned, just return a success message or void
  return;
}


//login



export async function loginUser(username: string, password: string) {
    const response = await fetch(`${backendUrl}/public/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: username, password }),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json(); // returns { email }
}

export async function verifyEmail(email: string, code: string) {
    const response = await fetch(`${backendUrl}/public/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.text(); // JWT token
}

export async function sendVerificationCode(email: string) {
  const response = await fetch(`${backendUrl}/public/send-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return; // no return value needed
}


