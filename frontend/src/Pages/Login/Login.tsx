import { Link } from "react-router-dom";
import InputBox from "../../Components/InputBox/InputBox";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { useState } from "react";

interface UserData {
  email: string;
  password: string;
}

const Login = () => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  return (
    <>
      <PageTemplate title="LOGIN ">
        <form className="text-black">
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
