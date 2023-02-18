import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthState } from "../../../../context/auth/AuthProvider";
import { NotificationState } from "../../../../context/notification/NotificationProvider";
import { loginInfo } from "../types/types";

export const useSignIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { handleLogin, authInfo } = AuthState();
  const { isPending, isLoggedIn } = authInfo;

  const isValidEmail = (email: string) => {
    const isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return isValid.test(email);
  };

  const { updateNotification } = NotificationState();

  const validateUserInfo = ({ email, password }: loginInfo) => {
    if (!email.trim()) return { ok: false, error: "Email is missing!" };
    if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

    if (!password.trim()) return { ok: false, error: "Password is missing!" };
    if (password.length < 8)
      return { ok: false, error: "Password must be 8 characters long!" };

    return { ok: true };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error || "error");

    handleLogin(userInfo.email, userInfo.password);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return {
    handleChange,
    onSubmit,
    userInfo,
    isPending,
  };
};
