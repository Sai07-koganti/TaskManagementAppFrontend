import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

import api from "../api/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    profileImage: ""
  });

  const fetchUser = async () => {

    const token =
      localStorage.getItem("token");

    if (!token) return;

    try {

      const response =
        await api.get("/users/me");

      setUser(response.data);

    } catch (error) {

      console.error(
        "Failed to load user",
        error
      );

    }

  };

  useEffect(() => {

    fetchUser();

  }, []);

  const value = {

    user,

    setUser,

    fetchUser

  };

  return (

    <UserContext.Provider
      value={value}
    >

      {children}

    </UserContext.Provider>

  );

};

export const useUser = () =>
  useContext(UserContext);