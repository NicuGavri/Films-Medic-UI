import client from "./client";
import { userInfoType } from "../components/Forms/SignUp/types/types";
import { loginInfo } from "../components/Forms/SignIn/types/types";
import { OTPType } from "../components/Forms/VerifyEmail/types/types";

export const createUser = async (userInfo: userInfoType) => {
  try {
    const { data } = await client.post("/user/create", userInfo);
    return data;
  } catch (error: any) {
    return { error: error };
  }
};


export const verifyEmail = async (OTP: OTPType) => {
  try {
    const { data } = await client.post("/user/verify-email", OTP);
    return data;
  } catch (error: any) {
    return { error: error };
  }
};


export const signInUser = async (userInfo: loginInfo) => {
  try {
    const { data } = await client.post("/user/sign-in", userInfo);
    return data;
  } catch (error: any) {
    return { error: error };
  }
};


export const getIsAuth = async (token: string) => {
  try {
    const { data } = await client.get("/user/is-auth", {
      headers: {
        Authorization: 'Bearer ' + token,
        accept: 'application/json',
      }
    });
    return data;
  } catch (error: any) {
    return { error: error };
  }
};
