import { Link } from "react-router-dom";
import InputBox from "../../Components/InputBox/InputBox";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";

const Signup = () => {
  return (
    <>
      <PageTemplate title="SIGNUP ">
        <form className="text-black">
          <div className="grid md:grid-cols-2 md:gap-6">
            <InputBox text="First Name" />
            <InputBox text="Last Name" />
          </div>
          <InputBox text="Email" />
          <InputBox text="Password" />
          <InputBox text="Confirm Password" />
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
