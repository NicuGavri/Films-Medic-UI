import {FC} from "react"
import { SimpleInputProps } from "./types/types"

const SimpleInput: FC<SimpleInputProps> = ({label,name, type,value, handleChange}) => {
  return (
    <div className="relative bg-inherit">
    <input
      value={value}
      type={type}
      name={name}
      onChange={handleChange}
      id={name}
      className="block px-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent  rounded-lg border-[1px] border-gray-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
    />
    <label
      htmlFor={name}
      className="absolute text-sm z[-1] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-inherit dark:bg-inherit px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
    >
      {label}
    </label>
  </div>
  )
}

export default SimpleInput

