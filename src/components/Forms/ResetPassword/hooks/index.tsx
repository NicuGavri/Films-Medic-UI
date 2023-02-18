import { useSearchParams } from "react-router-dom";
import { resetPassword, verifyResetPasswordToken } from "../../../../api/auth";
import { NotificationState } from "../../../../context/notification/NotificationProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
  const { updateNotification } = NotificationState();
  const [passwords, setPasswords] = useState({
    passwordOne: "",
    passwordTwo: "",
  });
  const [valid, setIsValid] = useState<boolean>();
  const [error, setError] = useState<string>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const isTokenValid = async (token: string, id: string) => {
    const { error, valid } = await verifyResetPasswordToken(token, id);

    if (error) {
      setError(error.response.data.msg);
      return updateNotification("error", error.response.data.msg);
    }
    if (!valid) {
      setIsValid(false);
      return;
    } else setIsValid(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(passwords);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwords.passwordOne.trim().length < 8) {
      return updateNotification(
        "error",
        "Password must be at least 8 characters long"
      );
    }
    if (passwords.passwordOne !== passwords.passwordTwo) {
      return updateNotification("error", "Passwords do not match");
    }

    const { error, message } = await resetPassword(
      passwords.passwordOne,
      id as string,
      token as string
    );

    if (error) {
      return updateNotification("error", error.response.data.msg);
    } else {
      updateNotification("success", message);
      navigate("/sign-in", { replace: true });
    }
  };

  useEffect(() => {
    isTokenValid(token as string, id as string);
  }, [id, token]);

  return { valid, error, passwords, handleChange, onSubmit };
};
