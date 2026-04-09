import axios from "axios";
import { useTokens } from "../stores/tokenStore";

export const refreshTokens = async () => {
  try {
    const { refreshToken, setAccessToken, setRefreshToken, clearTokens } =
      useTokens.getState();

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await axios.post(
      "http://localhost:5064/api/Auth/refreshToken",
      {
        refreshToken: refreshToken, // ⚠️ backend bunu gözləyir
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = response.data;

    // ✅ həm access həm refresh set et
    if (response.status === 200 && data.accessToken) {
      setAccessToken(data.accessToken);

      // bəzi backendlər yeni refreshToken də qaytarır
      if (data.refreshToken) {
        setRefreshToken(data.refreshToken);
      }

      return data.accessToken;
    } else {
      throw new Error("Invalid refresh response");
    }
  } catch (error) {
    console.error("❌ Refresh token error:", error);

    // ❗ hər şey fail olsa → logout
    useTokens.getState().clearTokens();

    throw error;
  }
};