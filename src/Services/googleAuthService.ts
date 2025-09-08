// src/services/googleAuthService.ts
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const GOOGLE_CLIENT_ID = "602017219434-vg3ume0ocf8te46vamqeak6a6bab95v1.apps.googleusercontent.com"; // same as in backend
export const GOOGLE_REDIRECT_URI = `${backendUrl}/auth/google/callback`;

export function buildGoogleAuthUrl(): string {
  return `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile&access_type=offline&prompt=consent`;
}

export function openGooglePopup(url: string) {
  const width = 500;
  const height = 600;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;

  return window.open(
    url,
    "Google Login",
    `width=${width},height=${height},top=${top},left=${left}`
  );
}
