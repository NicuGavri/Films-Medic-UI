import { FC } from "react";
import { OutlineButtonProps } from "./types/types";
import {ImSpinner3} from "react-icons/im"

const OutlineButton: FC<OutlineButtonProps> = ({ children, type, onClick, isLoading  }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="w-full relative text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
    >
      {!isLoading ? children : <div className="mx-auto w-[13px]"><ImSpinner3 className="animate-spin" width={20} height={20}/></div>  }
    </button>
  );
};

OutlineButton.defaultProps = {
  type: "button",
}

export default OutlineButton;
