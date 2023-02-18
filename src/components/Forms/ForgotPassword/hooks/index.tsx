import { useState } from "react";
import { forgetPassword } from "../../../../api/auth";
import { NotificationState } from "../../../../context/notification/NotificationProvider";

export const useForgotPassword = () => {
  const { updateNotification } = NotificationState();

  const [email, setEmail] = useState("");
  const isValidEmail = (email: string) => {
    const isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return isValid.test(email);
  };

  const isEmailValid = (email: string) => {
    if (!email.trim()) return { ok: false, error: "Email is missing!" };
    if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

    return { ok: true };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { ok, error } = isEmailValid(email);
    if (!ok) return updateNotification("error", error || "error");
    const {error:requestError} = await forgetPassword(email);
    if(requestError) {
      return updateNotification("error", requestError.response.data.error);
    }

  };

  return {onSubmit, handleChange};
};
