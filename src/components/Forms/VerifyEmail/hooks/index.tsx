import { Link, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { verifyEmail } from "../../../../api/auth";
import { useLocation } from "react-router-dom";
import { NotificationState } from "../../../../context/notification/NotificationProvider";
import { AuthState } from "../../../../context/auth/AuthProvider";

let currentOtpIndex: number = 0;

export const useVerifyEmail = () => {

  const OTP_LENGTH = 6;
  const { updateNotification } = NotificationState();
  const { state } = useLocation();
  const user = state?.user;
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const {isAuth,authInfo} = AuthState()

  const {isLoggedIn} = authInfo

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newOtp: string[] = [...otp];
    setOtp(newOtp);
    newOtp[currentOtpIndex] = value.substring(value.length - 1);
    if (!value) {
      setActiveOTPIndex(currentOtpIndex - 1);
    } else {
      setActiveOTPIndex(currentOtpIndex + 1);
    }
  };

  const handleKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOtpIndex = index;
    if (key === "Backspace") {
      setActiveOTPIndex(currentOtpIndex - 1);
    }
  };

  const isOTPValid = (otp: string[]) => {
    let isValid = false;
    for (let val of otp) {
      isValid = !isNaN(parseInt(val));
      if (isValid) console.log("isValid");
      if (!isValid) break;
    }
    return isValid;
  };


  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isOTPValid(otp)) return updateNotification('error', 'invalid Otp');

    const response = await verifyEmail({ OTP: otp.join(""), userId: user.id });   
    console.log(response)
    if (response.error) {
      console.log(response.error);
      return updateNotification("error", response.error.response.data.msg);
    } else {
     updateNotification("success", response.message);
      localStorage.setItem('auth-token', response.user.token)
      setTimeout(() => {
      isAuth()
      },2000)
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  useEffect(() => {
    if (!user) navigate("/not-found");
    if(isLoggedIn) navigate("/")
  }, [user, navigate, isLoggedIn]);

  return {
    onSubmit,
    handleKeyDown,
    handleOtpChange,
    inputRef,
    activeOTPIndex,
    otp,
  };
};
