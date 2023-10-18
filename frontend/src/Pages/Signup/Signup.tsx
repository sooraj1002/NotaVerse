import { Link, useNavigate } from "react-router-dom";
import InputBox from "../../Components/InputBox/InputBox";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  picture: string;
}

const Signup = () => {
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    picture: "",
  });

  const [uploadedPicture, setUploadedPicture] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();
  const { user, login, expired } = useAuth();

  useEffect(() => {
    if (user && !expired()) {
      navigate("/mynotes");
    }
  }, [user, expired]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsUploading(true);
        await handleImageUpload();
      } catch (error) {
        alert("could not upload image");
      } finally {
        setIsUploading(false);
      }
    };

    fetchData();
  }, [selectedImage]);

  useEffect(() => {
    const updateUserData = async () => {
      try {
        setIsUploading(true);
        if (uploadedPicture) {
          setUserData((prevUserData) => ({
            ...prevUserData,
            picture: uploadedPicture,
          }));
        }
      } catch (error) {
        console.log("could not update the state");
      } finally {
        setIsUploading(false);
      }
    };

    updateUserData();
  }, [uploadedPicture]);

  const handleChange = (name: string, value: string) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userData);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(userData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      alert("Please enter the correct password in both fields");
      return false;
    }

    const backendURL = import.meta.env.VITE_BACKEND_LINK;

    try {
      if (userData.picture.length === 0) {
        userData.picture =
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
      }
      const response = await fetch(`${backendURL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      const accessToken = responseData.access_token;

      if (response.ok) {
        login(accessToken);
        navigate("/mynotes");
      } else {
        alert("Email Already Exists, use another Email Id");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedImage(files[0]);
    }
  };

  const [cloudName] = useState("dw7b1p63j");
  const [uploadPreset] = useState("NotaVerse");

  const handleImageUpload = async () => {
    if (
      selectedImage?.type === "image/jpeg" ||
      selectedImage?.type === "image/png"
    ) {
      const formData = new FormData();
      formData.append("file", selectedImage);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params: {
              upload_preset: uploadPreset,
            },
          }
        );
        console.log(response);
        if (response.data.url) {
          console.log("uploaded image", response.data.url);
          setUploadedPicture(response.data.url);
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
  };

  return (
    <>
      <PageTemplate title="SIGNUP ">
        <form className="text-black" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <InputBox
              text="First Name"
              value={userData.firstName}
              handleChange={(value) => handleChange("firstName", value)}
            />
            <InputBox
              text="Last Name"
              value={userData.lastName}
              handleChange={(value) => handleChange("lastName", value)}
            />
          </div>
          <InputBox
            text="Email"
            value={userData.email}
            handleChange={(value) => handleChange("email", value)}
          />
          <InputBox
            text="Password"
            value={userData.password}
            handleChange={(value) => handleChange("password", value)}
          />
          <InputBox
            text="Confirm Password"
            value={userData.confirmPassword}
            handleChange={(value) => handleChange("confirmPassword", value)}
          />
          <div className="my-6">
            <label className="block mb-2 text-sm font-medium text-gray-500">
              Upload Photo
            </label>
            <input
              className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50focus:outline-none "
              type="file"
              onChange={handleImageChange}
            />
            {uploadedPicture &&
              uploadedPicture !==
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" && (
                <img
                  src={uploadedPicture}
                  alt="Selected"
                  className="mt-2 max-w-xs"
                />
              )}
          </div>
          <button
            disabled={isUploading}
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Submit
          </button>
        </form>
        <p className="py-2">
          Already have an Account?{" "}
          <Link to="/login" className="text-blue-500">
            Login Here
          </Link>
        </p>
      </PageTemplate>
    </>
  );
};

export default Signup;
