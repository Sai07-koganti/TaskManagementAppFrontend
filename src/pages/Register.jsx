import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

    if (
      password !==
      confirmPassword
    ) {

      alert(
        "Passwords do not match"
      );

      return;
    }

    try {

      await api.post(
        "/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert(
        "Registration Successful"
      );

      navigate("/");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="container">

      <div className="row vh-100 justify-content-center align-items-center">

        <div className="col-md-4">

          <div className="card bg-dark text-white">

            <div className="card-body">

              <h2 className="text-center mb-4">
                Register
              </h2>

              <input
                className="form-control mb-3"
                placeholder="Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
              />

              <input
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

              <div className="mb-3">

                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                />

              </div>

              <button
                className="btn btn-success w-100"
                onClick={
                  handleRegister
                }
              >
                Register
              </button>

              <div className="text-center mt-3">

                <Link to="/">
                  Back To Login
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;