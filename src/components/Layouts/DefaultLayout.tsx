import {Navbar} from "../index";
import {FC} from "react";
import { DefaultLayoutProps } from "./types/types";

const DefaultLayout: FC<DefaultLayoutProps> = ({children}) => {
  return (
    <div className="flex flex-col h-screen bg-blue-500 dark:bg-[#0D1117]">
      <Navbar/>
      {children}
    </div>
  )
}

export default DefaultLayout
