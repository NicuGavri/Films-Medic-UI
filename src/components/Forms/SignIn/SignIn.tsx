import { SimpleInput, OutlineButton } from "../../index";
import { Link } from "react-router-dom";
import { useSignIn } from "./hooks";

const SignInForm = () => {
  const { onSubmit, handleChange, userInfo, isPending } = useSignIn();

  return (
    <div className=" flex justify-center items-center h-full">
      <div className="bg-purple-secondary border-gray-600 border-[2px] rounded-xl w-96 h-96 flex items-center justify-center">
        <form className="w-80 text-center bg-inherit text-white py-2 space-y-4">
          <h1>Sign In</h1>
          <SimpleInput
            type="email"
            label="Email"
            name="email"
            value={userInfo.email}
            handleChange={handleChange}
            required={true}
          />
          <SimpleInput
            type="password"
            label="Password"
            name="password"
            handleChange={handleChange}
            value={userInfo.password}
            required={true}
          />
          <OutlineButton type="submit" onClick={onSubmit} isLoading={isPending}>
            Sign In
          </OutlineButton>
          <div className="flex justify-between text-sm">
            <Link className="hover:underline" to="/forgot-password">
              Forgot password?
            </Link>
            <Link className="hover:underline" to="/sign-up">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
