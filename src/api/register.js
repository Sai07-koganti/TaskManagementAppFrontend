import api from "../api";

const register = async () => {

  await api.post(
    "/auth/register",
    {
      name,
      email,
      password
    }
  );
};