import axios from "axios";
import { useTokens } from "../stores/tokenStore";

export const refreshTokens = async () => {
  try {
    const {
      refreshToken,
      setAccessToken,
      setRefreshToken,
      setRoles,
      clearTokens,
    } = useTokens.getState();

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await axios.post(
      "http://localhost:5064/api/Auth/refreshToken",
      {
        refreshToken: refreshToken,
      }
    );

    const data = response.data;

    // ✅ yoxlama
    if (response.status === 200 && data.accessToken) {
      // 🔥 access token
      setAccessToken(data.accessToken);

      // 🔥 refresh token (əgər yenisi gəlirsə)
      if (data.refreshToken) {
        setRefreshToken(data.refreshToken);
      }

      // 🔥 ROLES (ƏN VACİB)
      if (data.roles) {
        // arraydirsə olduğu kimi
        // stringdirsə array-ə çevir
        const rolesArray = Array.isArray(data.roles)
          ? data.roles
          : [data.roles];

        setRoles(rolesArray);
      }

      // 🔥 interceptor üçün object qaytar
      return {
        accessToken: data.accessToken,
        roles: data.roles || [],
      };
    } else {
      throw new Error("Invalid refresh response");
    }
  } catch (error) {
    console.error("❌ Refresh token error:", error);

    // ❗ logout
    clearTokens();

    throw error;
  }
}; 