import { Link } from "react-router-dom";
import InputBox from "../../Components/InputBox/InputBox";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import { useState } from "react";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (name: string, value: string) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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
          <button
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
