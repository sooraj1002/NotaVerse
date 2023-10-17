import { Link, useNavigate } from "react-router-dom";
import InputBox from "../../Components/InputBox/InputBox";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

interface UserData {
  email: string;
  password: string;
}

interface JwtPayload {
  sub: number;
  email: string;
  exp: number;
}

const Login = () => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (token) {
      try {
        const decoded: JwtPayload = jwt_decode(token);
        if (decoded.exp * 1000 > Date.now()) {
          navigate("/mynotes");
        }
      } catch (error) {
        console.log("token has expired");
      }
    }
  }, [token]);

  const navigate = useNavigate();

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

    const backendURL = import.meta.env.VITE_BACKEND_LINK;

    try {
      const response = await fetch(`${backendURL}/auth/login`, {
        method: "POST",
        Navbars: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      const accessToken = responseData.access_token;

      if (response.ok) {
        localStorage.setItem("accessToken", accessToken);
        navigate("/mynotes");
      } else {
        alert("Please Enter Correct Email and Password");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <>
      <PageTemplate title="LOGIN ">
        <form className="text-black" onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Submit
          </button>
        </form>
        <p className="py-2">
          New to NotaVerse?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup Here
          </Link>
        </p>
      </PageTemplate>
    </>
  );
};

export default Login;
