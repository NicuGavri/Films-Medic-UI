import { useState, useEffect } from "react";
import { createUser } from "../../../../api/auth";
import { useNavigate } from "react-router-dom";
import { NotificationState } from "../../../../context/notification/NotificationProvider";
import { userInfoType } from ".././types/types";
import { AuthState } from "../../../../context/auth/AuthProvider";

export const useSignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { authInfo } = AuthState();
  const { isLoggedIn } = authInfo;
  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    const isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return isValid.test(email);
  };

  const { updateNotification } = NotificationState();

  const validateUserInfo = ({ name, email, password }: userInfoType) => {
    const isValidName = /^[a-z A-Z]+$/;

    if (!name.trim()) return { ok: false, error: "Name is missing!" };
    if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

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

    const response = await createUser(userInfo);
    if (response.error)
      return updateNotification("error", response.error.response.data.msg);
    navigate("/verify-email", {
      state: { user: response.user },
      replace: true,
    });
   
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return {
    handleChange,
    userInfo,
    onSubmit,
  };
};
