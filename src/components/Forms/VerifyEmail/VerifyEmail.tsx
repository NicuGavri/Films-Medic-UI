import {OutlineButton } from "../../index";
import { Link } from "react-router-dom";
import { useVerifyEmail } from "./hooks";


  const VerifyEmailForm = () => {
  const {inputRef, activeOTPIndex, handleOtpChange, handleKeyDown, onSubmit, otp} = useVerifyEmail()

  return (
    <div className=" flex justify-center items-center h-full">
      <div className="bg-[#0e0d17] border-gray-600 border-[2px] rounded-xl w-[400px] h-[250px] flex items-center justify-center">
        <form className="w-[300px] text-center bg-inherit text-white py-2 space-y-4">
          <h1 className="text-white">
            Please enter the OTP to verify your email
          </h1>
          <div className="text-xs">The OTP has been sent to your email</div>

          <div className="flex space-x-2">
            {otp.map((_, index) => {
              return (
                <input
                  ref={index === activeOTPIndex ? inputRef : null}
                  onChange={handleOtpChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  value={otp[index]}
                  key={index}
                  type="number"
                  className="w-11 h-11 border-2 rounded border-dark-subtle focus:border-white bg-transparent outline-none text-center font-semibold"
                ></input>
              );
            })}
          </div>
          <OutlineButton type="submit" onClick={onSubmit}>Verify Email</OutlineButton>
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

export default VerifyEmailForm;
