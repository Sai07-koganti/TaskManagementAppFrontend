import { useState, useEffect } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";

function Profile() {
const {user,setUser, fetchUser} = useUser();
  useEffect(() => {
    fetchProfile();
}, []);

const fetchProfile = async () => {

    try {
        const response =
            await api.get("/users/me");
          setUser(response.data);

    } catch(error){

        console.error(error);

    }
};

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]:
        e.target.value
    });

  };

  const handleImageUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {

        const response = await api.post(
            "/users/profile-image",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        setUser(response.data);

        toast.success("Profile Image Updated");

    } catch (error) {

        console.error(error);

        toast.error("Upload Failed");

    }
};
  const updateProfile = async () => {

    try {

        await api.put("/users/me", {
            name: user.name
        });

        await fetchUser();

        toast.success("Profile Updated");

    } catch (error) {

        console.error(error);

        toast.error("Update Failed");

    }
};

  return (

    <div className="container mt-4">

      <div className="card p-4">

        <h3 className="mb-4">
          Profile
        </h3>

        <div className="text-center">

          <img
    src={
          user.profileImage
            ? `http://localhost:8080/uploads/profile/${user.profileImage}`
            : "./Ntrimg1.jpeg"
          }
           alt="Profile"
            width="150"
            height="150"
            className="
            rounded-circle
            border
            mb-3"
            style={{
              objectFit:
                "cover"
            }}
          />

        </div>

        <div className="mb-3">

          <label
            className="
            form-label"
          >
            Upload Profile Picture
          </label>

          <input
            type="file"
            className="
            form-control"
            accept="image/*"
            onChange={
              handleImageUpload
            }
          />

        </div>

        <input
          className="
          form-control mb-3"
          name="name"
          value={user.name}
          onChange={
            handleChange
          }
          placeholder="Name"
        />

        <input
          className="
          form-control mb-3"
          name="email"
          value={user.email}
          onChange={
            handleChange
          }
          placeholder="Email"
        />

        <button
          className="
          btn btn-primary"
          onClick={
            updateProfile
          }
        >
          Save Changes
        </button>

      </div>

    </div>

  );
}

export default Profile;