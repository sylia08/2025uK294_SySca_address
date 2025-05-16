import { defaultAxiosInstance } from "./Api";

export const AuthService = {
  login: async (email: string, password: string) => {
    const response = await defaultAxiosInstance.post("/login", {
      email,
      password,
    });
    return response.data;
  },
};
