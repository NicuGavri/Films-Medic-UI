import {FC} from "react";
import { ToastProps } from "./types/types";

const Toast:FC<ToastProps> = ({notification, classes}) => {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-24 ">
      <div className="shadow-md shadow-gray-400 bg-red-400 rounded bounce-custom">
        <p className={classes + "text-white px-4 py-2 font-semibold "}>
          {notification}
        </p>
      </div>
    </div>
  );
};

export default Toast;
