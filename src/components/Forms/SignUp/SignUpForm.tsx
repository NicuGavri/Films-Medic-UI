import { SimpleInput, OutlineButton } from "../../index";
import { Link } from "react-router-dom";
import { useSignUp } from "./hooks";

const SignUpForm = () => {
  const { handleChange, userInfo, onSubmit } = useSignUp();

  return (
    <div className=" flex justify-center items-center h-full">
      <div className="bg-purple-secondary border-gray-600 border-[2px] rounded-xl w-96 h-96 flex items-center justify-center">
        <form className="w-80 text-center bg-inherit text-white py-2 space-y-4">
          <h1>Sign Up</h1>
          <SimpleInput
            handleChange={handleChange}
            value={userInfo.name}
            type="text"
            label="Name"
            name="name"
            required={true}
          />
          <SimpleInput
            handleChange={handleChange}
            value={userInfo.email}
            type="email"
            label="Email"
            name="email"
            required={true}
          />
          <SimpleInput
            handleChange={handleChange}
            value={userInfo.password}
            type="password"
            label="Password"
            name="password"
            required={true}
          />
          <OutlineButton type={"submit"} onClick={onSubmit}>
            Sign up
          </OutlineButton>
          <div className="flex justify-between text-sm">
            <Link className="hover:underline" to="/forgot-password">
              Forgot password?
            </Link>
            <Link className="hover:underline" to="/sign-in">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
