import { SimpleInput, OutlineButton } from "../../index";
import { Link } from "react-router-dom";
import { useForgotPassword } from "./hooks";

const ForgotPasswordForm = () => {

  const {onSubmit, handleChange} = useForgotPassword()

  return (
    <div className=" flex justify-center items-center h-full">
      <div className="bg-purple-secondary border-gray-600 border-[2px] rounded-xl w-96 h-64 flex items-center justify-center">
        <form className="w-80 text-center bg-inherit text-white py-2 space-y-4">
        <h1 className="text-white">Please enter your email</h1>
          <SimpleInput
            type="email"
            label="Email"
            name="email"
            handleChange={handleChange}
            required={true}
          />

          <OutlineButton onClick={onSubmit}>Send Link</OutlineButton>
          <div className="flex justify-between">
            <Link className="hover:underline" to="/sign-in">
              Sign In
            </Link>
            <Link className="hover:underline" to="/sign-up">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
