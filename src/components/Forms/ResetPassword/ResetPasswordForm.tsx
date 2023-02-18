import { SimpleInput, OutlineButton } from "../../index"
import { useResetPassword } from "./hooks"

const ResetPasswordForm = () => {

  const {valid, error, passwords, handleChange, onSubmit} = useResetPassword()

  return (
    <div className=" flex justify-center items-center h-full">
    <div className="bg-purple-secondary border-gray-600 border-[2px] rounded-xl h-96 w-96 flex items-center justify-center">
      { valid ?
        <form className="w-80 text-center bg-inherit text-white py-2 space-y-4">
        <h1>Enter new password</h1>
        <SimpleInput
          handleChange={handleChange}
          value={passwords.passwordOne}
          type="password"
          label="Password"
          name="passwordOne"
          required={true}
        />
        <SimpleInput
          handleChange={handleChange}
          value={passwords.passwordTwo}
          type="password"
          label="Confirm Password"
          name="passwordTwo"
          required={true}
        />
        <OutlineButton type={'submit'} onClick={onSubmit}>Confirm Password</OutlineButton>
 
      </form> : <h1 className="text-white text-center py-2 px-4">{error}</h1> }
    </div>
  </div>
  )
}

export default ResetPasswordForm