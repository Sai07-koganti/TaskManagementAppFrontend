import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../api/api";

function Login() {

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const response =
        await api.post(
          "/auth/login",
          {
            email,
            password
          }
        );

      localStorage.setItem(
        "token",
        response.data.token
      );
    navigate("/dashboard");
    window.location.reload();

      alert(
        "Login Successful"
      );

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert(
        "Invalid Credentials"
      );

    }
  };

  return (
    <div className="container">

      <div className="row vh-100 justify-content-center align-items-center">

        <div className="col-md-5">

          <div className="card p-4 shadow">

            <h2 className="text-center mb-4">
              Welcome Back 👋
            </h2>

            <input
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <div className="input-group mb-3">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {
                  showPassword
                    ? <FaEyeSlash />
                    : <FaEye />
                }
              </button>

            </div>

            <button
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>

            <Link
              className="mt-3 text-center"
              to="/register"
            >
              Create Account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;