// Service: fetches home data { username, greeting, weatherDescriptions, feelsLike }
import api from "../Services/api";
export interface HomeData {
  actualName: string;
  email:string;
}

export async function fetchHomeData(): Promise<HomeData> {
  try {
    const res = await api.get<HomeData>("/user/home"); 
    return res.data; // axios puts JSON response inside .data
  } catch (err: any) {
    // Optional: show error to user
    console.error("an Error occured:", err.message);
    throw err; // important: still throw so interceptor can handle logout
  }
}
