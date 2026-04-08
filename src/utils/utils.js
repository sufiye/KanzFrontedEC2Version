import axios from "axios";
import { useTokens } from "../stores/tokenStore";

export const refreshTokens = async () => {
  try {
    const refreshToken = useTokens.getState().refreshToken;
    console.log(refreshToken);
    if (!refreshToken) throw new Error("No refresh token found");

    
    const { data, status } = await axios.post(
      "http://localhost:5064/api/Auth/refreshToken",
      { refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );

    if (status === 200 && data.accessToken) {
      useTokens.getState().setAccessToken(data.accessToken);
      return data.accessToken;
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    console.error("Refresh token error:", error);
    useTokens.getState().clearTokens(); 
    throw error;
  }
};